import { env } from '$amplify/env/initSquad'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../data/resource'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)

Amplify.configure(resourceConfig, libraryOptions)

const client = generateClient<Schema>()

const testPlayers = {
  goalkeeper: {
    id: 18959,
    name: 'Robert Sánchez',
    age: 28,
    number: 1,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/18959.png',
  },
  lb: {
    id: 21998,
    name: 'A. Disasi',
    age: 27,
    number: 2,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/21998.png',
  },
  lcb: {
    id: 47380,
    name: 'Marc Cucurella',
    age: 27,
    number: 3,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/47380.png',
  },
  rcb: {
    id: 19145,
    name: 'T. Adarabioyo',
    age: 28,
    number: 4,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/19145.png',
  },
  rb: {
    id: 95,
    name: 'B. Badiashile',
    age: 24,
    number: 5,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/95.png',
  },
  lm: {
    id: 5996,
    name: 'E. Fernández',
    age: 24,
    number: 8,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/5996.png',
  },
  lcm: {
    id: 63577,
    name: 'M. Mudryk',
    age: 24,
    number: 10,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/63577.png',
  },
  rcm: {
    id: 138935,
    name: 'C. Chukwuemeka',
    age: 22,
    number: 17,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/138935.png',
  },
  rm: {
    id: 152982,
    name: 'C. Palmer',
    age: 23,
    number: 20,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/152982.png',
  },
  lf: {
    id: 1864,
    name: 'Pedro Neto',
    age: 25,
    number: 7,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/1864.png',
  },
  rf: {
    id: 136723,
    name: 'N. Madueke',
    age: 23,
    number: 11,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/136723.png',
  },
}

export const handler: Schema['initSquad']['functionHandler'] = async () => {
  try {
    await client.models.Squads.create({
      accountId: '1234',
      gkid: '123',
      lbid: '124',
      lcbid: '125',
      rcbid: '126',
      rbid: '127',
      lmid: '128',
      lcmid: '129',
      rcmid: '130',
      rmid: '131',
      lfid: '132',
      rfid: '133',
    })

    return {
      code: 200,
      message: 'Squad created',
    }
  } catch (e) {
    return {
      code: 500,
      message: 'Error',
    }
  }
}
