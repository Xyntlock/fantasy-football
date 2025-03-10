import { defineFunction, secret } from '@aws-amplify/backend'

export const updatePlayers = defineFunction({
  name: 'updatePlayers',
  schedule: 'every 5m',
  entry: './handler.ts',
  environment: {
    API_KEY: secret('football-api-key'),
  },
})
