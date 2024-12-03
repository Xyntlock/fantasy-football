import { defineFunction } from '@aws-amplify/backend'

export const getApi = defineFunction({
  name: 'get-api',
  entry: './handler.ts',
})
