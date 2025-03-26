// biome-ignore lint/style/useNodejsImportProtocol: node:fetch doesn't work in Lambda
import https from 'https'
import { env } from '$amplify/env/update-players'
import type { PlayerInformation } from './types'

type RequestArgs = {
  options: https.RequestOptions
}

export const getOptions = (page = 1) => ({
  hostname: 'v3.football.api-sports.io',
  path: `/players?league=39&season=2024&page=${page}`,
  method: 'GET',
  headers: {
    'x-rapidapi-key': env.API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
})

export const request = ({ options }: RequestArgs) =>
  new Promise((resolve, reject) => {
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

export const calculatePlayerPrice = (playerInformation: PlayerInformation) => {
  const ratings = playerInformation.statistics
    .map((stat) => stat.games.rating)
    .filter((rating) => !!rating)
    .map((rating) => Number.parseFloat(rating as string))
    .filter((rating) => !Number.isNaN(rating))

  const ratingsSum = ratings.reduce((acc, rating) => acc + rating, 0)
  const rating = ratings.length > 0 ? ratingsSum / ratings.length : null

  if (rating && rating > 0) {
    return rating * 1.5
  }

  return 5.0
}
