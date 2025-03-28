import { defineFunction } from '@aws-amplify/backend'

export const getSquad = defineFunction({
  name: 'get-squad',
  entry: './handler.ts',
})
