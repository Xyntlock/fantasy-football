// biome-ignore lint/style/useNodejsImportProtocol: node:fetch doesn't work in Lambda
import https from 'https'
import type { EventBridgeHandler } from 'aws-lambda'
import { env } from '$amplify/env/get-api'
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '../../data/resource'

const client = generateClient<Schema>()

interface TeamSquadResponse {
  get: string
  parameters: {
    team: string
  }
  errors: unknown[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: TeamSquad[]
}

interface TeamSquad {
  team: Team
  players: Player[]
}

interface Team {
  id: number
  name: string
  logo: string
}

interface Player {
  id: number
  name: string
  age: number
  number: number | null
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
  photo: string
}

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

  const data = await new Promise<TeamSquadResponse>((resolve, reject) => {
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
          const parsedData: TeamSquadResponse = JSON.parse(data)
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

  await Promise.all(
    data.response[0].players.map(async (player) => {
      const mappedPlayer = {
        pk: `player#${player.id}`,
        position: player.position,
        name: player.name,
        photo: player.photo,
        age: player.age,
      }

      return client.models.Squads.update(mappedPlayer)
    })
  )
}
