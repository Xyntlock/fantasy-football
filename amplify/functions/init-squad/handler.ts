import { env } from '$amplify/env/init-squad'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import type { SquadPlayer, Schema } from '../../data/resource'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)

Amplify.configure(resourceConfig, libraryOptions)

const client = generateClient<Schema>()

export const handler: Schema['initSquad']['functionHandler'] = async (
  event
) => {
  const { userId } = event.arguments

  try {
    const players: SquadPlayer[] = [
      {
        pk: `userid#${userId}-squad#1-player#270510`,
        position: 'gk',
      },
      {
        pk: `userid#${userId}-squad#1-player#19340`,
        position: 'lb',
      },
      {
        pk: `userid#${userId}-squad#1-player#482888`,
        position: 'lcb',
      },
      {
        pk: `userid#${userId}-squad#1-player#278115`,
        position: 'rcb',
      },
      {
        pk: `userid#${userId}-squad#1-player#15908`,
        position: 'rb',
      },
      {
        pk: `userid#${userId}-squad#1-player#293163`,
        position: 'lm',
      },
      {
        pk: `userid#${userId}-squad#1-player#357060`,
        position: 'lcm',
      },
      {
        pk: `userid#${userId}-squad#1-player#149564`,
        position: 'rcm',
      },
      {
        pk: `userid#${userId}-squad#1-player#136723`,
        position: 'rm',
      },
      {
        pk: `userid#${userId}-squad#1-player#195717`,
        position: 'lcf',
      },
      {
        pk: `userid#${userId}-squad#1-player#158696`,
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
