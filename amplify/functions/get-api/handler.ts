import https from 'https'
import type { Schema } from '../../data/resource'

const options: https.RequestOptions = {
  hostname: 'https://v3.football.api-sports.io',
  path: '/leagues',
  method: 'GET',
  headers: {
    // biome-ignore lint/suspicious/noExplicitAny: Amplify manages the replacement of this value
    'x-rapidapi-key': '0fbaddfaf82f459029be807e29c6db4a',
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
