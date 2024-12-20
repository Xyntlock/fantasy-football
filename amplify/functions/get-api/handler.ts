// biome-ignore lint/style/useNodejsImportProtocol: node:fetch doesn't work in Lambda
import https from 'https'
import { env } from '$amplify/env/get-api'
import type { Schema } from '../../data/resource'

const options: https.RequestOptions = {
  hostname: 'v3.football.api-sports.io',
  path: '/leagues',
  method: 'GET',
  headers: {
    'x-rapidapi-key': env.API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
}

export const handler: Schema['getApi']['functionHandler'] =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async (): Promise<any> => {
    console.log('starting lambda')

    return new Promise((resolve, reject) => {
      const req = https.get(options, (res) => {
        let data = ''
        console.log('getting response')
        // A chunk of data has been received.
        res.on('data', (chunk) => {
          data += chunk
        })

        console.log('data', data)

        // The whole response has been received.
        res.on('end', () => {
          try {
            console.log('finished')
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
