import https from 'node:https'
import { secret } from '@aws-amplify/backend'
import type { Schema } from '../../data/resource'

const options: https.RequestOptions = {
  hostname: 'https://v3.football.api-sports.io/football/',
  path: '/leagues',
  method: 'GET',
  headers: {
    // biome-ignore lint/suspicious/noExplicitAny: Amplify manages the replacement of this value
    'x-rapidapi-key': secret('football-api-key') as any,
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
}

export const handler: Schema['getApi']['functionHandler'] =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async (): Promise<any> => {
    return new Promise((resolve, reject) => {
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
