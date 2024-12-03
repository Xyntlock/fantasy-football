import type { Handler } from 'aws-lambda'
import type { Schema } from '../../data/resource'

export const handler: Schema['getApi']['functionHandler'] = async (
  event,
  context
) => {
  // your function code goes here
  console.log(event)
  return 'Hello, World!'
}
