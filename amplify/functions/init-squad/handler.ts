import { env } from '$amplify/env/init-squad'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import type { PositionEnum, Schema } from '../../data/resource'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)

Amplify.configure(resourceConfig, libraryOptions)

const client = generateClient<Schema>()

type SquadPlayer = {
  pk: string
  position: PositionEnum
}

export const handler: Schema['initSquad']['functionHandler'] = async (
  event
) => {
  const { userId } = event.arguments

  try {
    const players: SquadPlayer[] = [
      {
        pk: `userid#${userId}-squad#1-player#1`,
        position: 'gk',
      },
      {
        pk: `userid#${userId}-squad#1-player#2`,
        position: 'lb',
      },
      {
        pk: `userid#${userId}-squad#1-player#3`,
        position: 'lcb',
      },
      {
        pk: `userid#${userId}-squad#1-player#4`,
        position: 'rcb',
      },
      {
        pk: `userid#${userId}-squad#1-player#5`,
        position: 'rb',
      },
      {
        pk: `userid#${userId}-squad#1-player#6`,
        position: 'lm',
      },
      {
        pk: `userid#${userId}-squad#1-player#7`,
        position: 'lcm',
      },
      {
        pk: `userid#${userId}-squad#1-player#8`,
        position: 'rcm',
      },
      {
        pk: `userid#${userId}-squad#1-player#9`,
        position: 'rm',
      },
      {
        pk: `userid#${userId}-squad#1-player#10`,
        position: 'lcf',
      },
      {
        pk: `userid#${userId}-squad#1-player#11`,
        position: 'rcf',
      },
    ]

    await Promise.all(
      players.map((player) => {
        client.models.Squads.create(player)
      })
    )

    await client.models.Squads.create({
      pk: `userid#${userId}-squad#1`,
      name: 'New Squad',
    })

    return {
      code: 200,
      message: 'Squad created',
    }
  } catch (e) {
    return {
      code: 500,
      message: 'Error',
    }
  }
}
