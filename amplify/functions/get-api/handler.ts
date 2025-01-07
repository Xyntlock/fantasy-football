// biome-ignore lint/style/useNodejsImportProtocol: node:fetch doesn't work in Lambda
import https from 'https'
import { env } from '$amplify/env/get-api'
import type { Schema } from '../../data/resource'

export const handler: Schema['getApi']['functionHandler'] =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async (): Promise<any> => {
    console.log('env', env)

    const options: https.RequestOptions = {
      hostname: 'v3.football.api-sports.io',
      path: '/teams?id=46&season=2021',
      method: 'GET',
      headers: {
        'x-rapidapi-key': env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    }

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
