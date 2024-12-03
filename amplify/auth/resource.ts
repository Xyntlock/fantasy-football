import { defineAuth } from '@aws-amplify/backend'
import { getApi } from '../functions/get-api/resource'

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  access: (allow) => [allow.resource(getApi).to([])],
})
