import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import { getApi } from './functions/get-api/resource'

defineBackend({
  auth,
  data,
  getApi,
})
