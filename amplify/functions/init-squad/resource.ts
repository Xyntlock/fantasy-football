import { defineFunction } from '@aws-amplify/backend'

export const initSquad = defineFunction({
  name: 'init-squad',
  entry: './handler.ts',
})
