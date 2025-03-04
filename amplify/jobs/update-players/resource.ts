import { defineFunction, secret } from '@aws-amplify/backend'

export const updatePlayers = defineFunction({
  name: 'updatePlayers',
  schedule: 'every week',
  entry: './handler.ts',
  environment: {
    API_KEY: secret('football-api-key'),
  },
})
