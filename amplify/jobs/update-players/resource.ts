import { defineFunction } from '@aws-amplify/backend'

export const updatePlayers = defineFunction({
  name: 'updatePlayers',
  schedule: 'every 1m',
})
