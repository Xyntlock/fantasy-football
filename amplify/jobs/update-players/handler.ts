import type { EventBridgeHandler } from 'aws-lambda'

export const handler: EventBridgeHandler<
  'Scheduled Event',
  null,
  boolean
> = async (event) => {
  console.log('event', JSON.stringify(event, null, 2))
  return true
}
