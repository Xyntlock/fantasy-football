import { secret } from '@aws-amplify/backend'
import type { Handler } from 'aws-lambda'
import axios, { type AxiosHeaderValue, type AxiosRequestConfig } from 'axios'
import type { Schema } from '../../data/resource'

const config: AxiosRequestConfig = {
  method: 'get',
  url: 'https://v3.football.api-sports.io/football/leagues/',
  headers: {
    'x-rapidapi-key': secret('football-api-key') as unknown as AxiosHeaderValue,
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
}

export const handler: Schema['getApi']['functionHandler'] = async (
  event,
  context
) => {
  const response = await axios(config)
  // your function code goes here
  console.log(event)
  return response.data
}
