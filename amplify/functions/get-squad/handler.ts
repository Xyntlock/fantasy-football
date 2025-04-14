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

  const squad = await client.models.Squads.get({
    pk: `userid#${userId}-squad#1`,
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
    const squadPlayer = squadPlayers.find((squadPlayerItem) => {
      const squadPlayerId = squadPlayerItem.pk.split('player#')[1]
      return player.data?.pk === `player#${squadPlayerId}`
    })

    return { ...player.data, position: squadPlayer?.position }
  })

  const playerSquad = {
    gk: players.find((player) => player.position === 'gk'),
    lb: players.find((player) => player.position === 'lb'),
    lcb: players.find((player) => player.position === 'lcb'),
    rcb: players.find((player) => player.position === 'rcb'),
    rb: players.find((player) => player.position === 'rb'),
    lm: players.find((player) => player.position === 'lm'),
    lcm: players.find((player) => player.position === 'lcm'),
    rcm: players.find((player) => player.position === 'rcm'),
    rm: players.find((player) => player.position === 'rm'),
    lcf: players.find((player) => player.position === 'lcf'),
    rcf: players.find((player) => player.position === 'rcf'),
  }

  return {
    squad: squad.data as Squad,
    squadPlayers: playerSquad,
  }
}
