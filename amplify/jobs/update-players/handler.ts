// biome-ignore lint/style/useNodejsImportProtocol: node:fetch doesn't work in Lambda
import https from 'https'
import type { EventBridgeHandler } from 'aws-lambda'
import { env } from '$amplify/env/get-api'

export const handler: EventBridgeHandler<
  'Scheduled Event',
  null,
  unknown
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

  console.log('entered lambda', options)

  return new Promise((resolve, reject) => {
    const req = https.get(options, (res) => {
      console.log('beginning data')

      let data = ''
      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received.
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data)
          console.log('players', parsedData)
          resolve(parsedData)
        } catch (error) {
          reject(new Error(`Error parsing JSON: ${error}`))
        }
      })
    })

    req.on('error', (error) => {
      reject(new Error(`Error making request: ${error.message}`))
    })

    req.end()
  })
}
