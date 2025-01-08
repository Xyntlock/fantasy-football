import { generateClient } from 'aws-amplify/api'
import { useEffect, useState } from 'react'
import type { Schema } from '../../../../amplify/data/resource'
import type { Player } from '../../../types'
import { PlayerCard } from '../../components/PlayerCard/PlayerCard'
import Page from '../Page'

const client = generateClient<Schema>()

const testPlayers: Array<Player> = [
  {
    id: 18959,
    name: 'Robert Sánchez',
    age: 28,
    number: 1,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/18959.png',
  },
  {
    id: 286616,
    name: 'F. Jörgensen',
    age: 23,
    number: 12,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/286616.png',
  },
  {
    id: 19012,
    name: 'M. Bettinelli',
    age: 33,
    number: 13,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/19012.png',
  },
  {
    id: 152955,
    name: 'L. Bergström',
    age: 23,
    number: 47,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/152955.png',
  },
  {
    id: 287868,
    name: 'Max Merrick',
    age: 20,
    number: 50,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/287868.png',
  },
  {
    id: 64167,
    name: 'G. Słonina',
    age: 21,
    number: null,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/64167.png',
  },
  {
    id: 21998,
    name: 'A. Disasi',
    age: 27,
    number: 2,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/21998.png',
  },
  {
    id: 47380,
    name: 'Marc Cucurella',
    age: 27,
    number: 3,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/47380.png',
  },
  {
    id: 19145,
    name: 'T. Adarabioyo',
    age: 28,
    number: 4,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/19145.png',
  },
  {
    id: 95,
    name: 'B. Badiashile',
    age: 24,
    number: 5,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/95.png',
  },
  {
    id: 152953,
    name: 'L. Colwill',
    age: 22,
    number: 6,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/152953.png',
  },
  {
    id: 2933,
    name: 'B. Chilwell',
    age: 29,
    number: 21,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/2933.png',
  },
  {
    id: 19545,
    name: 'R. James',
    age: 26,
    number: 24,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/19545.png',
  },
  {
    id: 161907,
    name: 'M. Gusto',
    age: 22,
    number: 27,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/161907.png',
  },
  {
    id: 22094,
    name: 'W. Fofana',
    age: 25,
    number: 29,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/22094.png',
  },
  {
    id: 366735,
    name: 'Joshua Kofi Acheampong',
    age: 19,
    number: 34,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/366735.png',
  },
  {
    id: 422780,
    name: 'A. Anselmino',
    age: 20,
    number: null,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/422780.png',
  },
  {
    id: 364048,
    name: 'Harrison Murray-Campbell',
    age: 19,
    number: null,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/364048.png',
  },
  {
    id: 306263,
    name: 'Richard Olise',
    age: 21,
    number: null,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/306263.png',
  },
  {
    id: 334042,
    name: 'Kaiden Wilson',
    age: 20,
    number: null,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/334042.png',
  },
  {
    id: 5996,
    name: 'E. Fernández',
    age: 24,
    number: 8,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/5996.png',
  },
  {
    id: 63577,
    name: 'M. Mudryk',
    age: 24,
    number: 10,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/63577.png',
  },
  {
    id: 138935,
    name: 'C. Chukwuemeka',
    age: 22,
    number: 17,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/138935.png',
  },
  {
    id: 152982,
    name: 'C. Palmer',
    age: 23,
    number: 20,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/152982.png',
  },
  {
    id: 148099,
    name: 'K. Dewsbury-Hall',
    age: 27,
    number: 22,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/148099.png',
  },
  {
    id: 116117,
    name: 'M. Caicedo',
    age: 24,
    number: 25,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/116117.png',
  },
  {
    id: 270507,
    name: 'C. Casadei',
    age: 22,
    number: 31,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/270507.png',
  },
  {
    id: 365660,
    name: 'K. Dyer',
    age: 19,
    number: 33,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/365660.png',
  },
  {
    id: 336671,
    name: 'Renato Veiga',
    age: 22,
    number: 40,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/336671.png',
  },
  {
    id: 282125,
    name: 'R. Lavia',
    age: 21,
    number: 45,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/282125.png',
  },
  {
    id: 327733,
    name: 'Sam Rak-Sakyi',
    age: 20,
    number: 51,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/327733.png',
  },
  {
    id: 274550,
    name: 'H. Vale',
    age: 22,
    number: null,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/274550.png',
  },
  {
    id: 1864,
    name: 'Pedro Neto',
    age: 25,
    number: 7,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/1864.png',
  },
  {
    id: 136723,
    name: 'N. Madueke',
    age: 23,
    number: 11,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/136723.png',
  },
  {
    id: 583,
    name: 'João Félix',
    age: 26,
    number: 14,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/583.png',
  },
  {
    id: 283058,
    name: 'N. Jackson',
    age: 24,
    number: 15,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/283058.png',
  },
  {
    id: 269,
    name: 'C. Nkunku',
    age: 28,
    number: 18,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/269.png',
  },
  {
    id: 18,
    name: 'J. Sancho',
    age: 25,
    number: 19,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/18.png',
  },
  {
    id: 334037,
    name: 'Tyrique George',
    age: 19,
    number: 32,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/334037.png',
  },
  {
    id: 415001,
    name: 'Deivid Washington',
    age: 20,
    number: 36,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/415001.png',
  },
  {
    id: 329347,
    name: 'O. Kellyman',
    age: 20,
    number: 37,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/329347.png',
  },
  {
    id: 392270,
    name: 'Marc Guiu',
    age: 19,
    number: 38,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/392270.png',
  },
  {
    id: 359117,
    name: 'Shumaira Mheuka',
    age: 18,
    number: 76,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/359117.png',
  },
  {
    id: 360011,
    name: 'Ato Ampah',
    age: 19,
    number: null,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/360011.png',
  },
]

const HomePage = () => {
  const [players, setPlayers] = useState<Array<Player>>(testPlayers)

  // useEffect(() => {
  //   client.queries.getApi().then((data) => {
  //     const json = JSON.parse(data.data as string)
  //     const response = json.response[0]

  //     setPlayers(response.players)
  //     console.log(response.players)
  //   })
  // }, [])

  return (
    <Page>
      Home Page{' '}
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </Page>
  )
}

export default HomePage
