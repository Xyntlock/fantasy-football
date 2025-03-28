import { env } from '$amplify/env/init-squad'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../data/resource'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)

Amplify.configure(resourceConfig, libraryOptions)

const client = generateClient<Schema>()

export const handler: Schema['initSquad']['functionHandler'] = async (
  userId: string
) => {
  try {
    await client.models.Squads.create({
      pk: `userid#${userId}-squad#1`,
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
