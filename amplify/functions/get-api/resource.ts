import { defineFunction, secret } from '@aws-amplify/backend'

export const getApi = defineFunction({
  name: 'get-api',
  entry: './handler.ts',
  environment: {
    API_KEY: secret('football-api-key'),
  },
})
