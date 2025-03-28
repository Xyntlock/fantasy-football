import { env } from '$amplify/env/get-squad'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import type { Player, Schema, Squad, SquadPlayer } from '../../data/resource'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)

Amplify.configure(resourceConfig, libraryOptions)

const client = generateClient<Schema>()

export const handler: Schema['getSquad']['functionHandler'] = async (event) => {
  const { userId } = event.arguments

  console.log('user id', userId)

  const promises = []

  promises.push(client.models.Squads.get({ pk: `userid#${userId}-squad#1` }))
  promises.push(
    client.models.Squads.list({
      filter: {
        pk: {
          contains: `userid#${userId}-squad#1-player#`,
        },
      },
    })
  )

  const res = await client.models.Squads.list({
    filter: {
      pk: {
        contains: `userid#${userId}-squad#1-player#`,
      },
    },
  })

  const squadPlayers: SquadPlayer[] = []
  let nextToken: string | undefined | null = undefined
  do {
    // biome-ignore lint/suspicious/noImplicitAnyLet: Don't know how to type this
    let res
    if (nextToken) {
      res = await client.models.Squads.list({
        filter: {
          pk: {
            contains: `userid#${userId}-squad#1-player#`,
          },
        },
        nextToken,
      })
    } else {
      res = await client.models.Squads.list({
        filter: {
          pk: {
            contains: `userid#${userId}-squad#1-player#`,
          },
        },
      })
    }

    squadPlayers.push(...(res.data as SquadPlayer[]))
    nextToken = res.nextToken
  } while (squadPlayers.length < 11 && nextToken)

  const [squad] = await Promise.all(promises)

  console.log('squad', squad)

  console.log('squadPlayers', squadPlayers)

  const players = (
    await Promise.all(
      squadPlayers.map((player) => {
        const playerId = player.pk.split('player#')[1]

        return client.models.Squads.get({
          pk: `player#${playerId}`,
        })
      })
    )
  ).map((player) => {
    return player.data
  })

  console.log('players', players)

  return {
    squad: squad.data as Squad,
    squadPlayers: players as Player[],
  }
}
