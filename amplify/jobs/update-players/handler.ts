import type { EventBridgeHandler } from 'aws-lambda'
import { env } from '$amplify/env/update-players'
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '../../data/resource'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { Amplify } from 'aws-amplify'
import { getOptions, request } from './request'
import type { GetPlayersResponse } from './types'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)

Amplify.configure(resourceConfig, libraryOptions)

const client = generateClient<Schema>()

export const handler: EventBridgeHandler<
  'Scheduled Event',
  null,
  unknown
> = async (event) => {
  let currentPage = 1
  let maxPage: number

  const players = []

  do {
    const options = getOptions(currentPage)
    const playersResponse = (await request({ options })) as GetPlayersResponse
    players.push(...playersResponse.response)
    maxPage = playersResponse.paging.total
    currentPage++
  } while (currentPage <= maxPage)

  // TODO figure out how filtering works to filter only for `player` prefix
  const existingPlayers = (await client.models.Squads.list()).data

  await Promise.all(
    players.map(async ({ player, statistics }) => {
      const pk = `player#${player.id}`

      const mappedPlayer = {
        pk,
        name: player.name,
        firstName: player.firstname,
        lastName: player.lastname,
        age: player.age,
        nationality: player.nationality,
        height: player.height,
        weight: player.weight,
        photo: player.photo,
        position: statistics[0].games.position,
        statistics,
      }

      if (
        existingPlayers.filter(
          (existingPlayer) => mappedPlayer.pk === existingPlayer.pk
        ).length > 0
      ) {
        return client.models.Squads.update(mappedPlayer)
      }

      return client.models.Squads.create(mappedPlayer)
    })
  )
}
