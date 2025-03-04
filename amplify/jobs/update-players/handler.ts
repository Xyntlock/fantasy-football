// biome-ignore lint/style/useNodejsImportProtocol: node:fetch doesn't work in Lambda
import https from 'https'
import type { EventBridgeHandler } from 'aws-lambda'
import { env } from '$amplify/env/get-api'

export const handler: EventBridgeHandler<
  'Scheduled Event',
  null,
  boolean
> = async (event) => {
  const options: https.RequestOptions = {
    hostname: 'v3.football.api-sports.io',
    path: '/players/squads?team=46',
    method: 'GET',
    headers: {
      'x-rapidapi-key': env.API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io',
    },
  }

  let players: unknown
  const req = https.get(options, (res) => {
    let data = ''
    // A chunk of data has been received.
    res.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received.
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data)
        players = parsedData
        console.log('players', players)
      } catch (error) {
        throw new Error(`Error parsing JSON: ${error}`)
      }
    })
  })

  req.on('error', (error) => {
    throw new Error(`Error making request: ${error.message}`)
  })

  req.end()

  return true
}
