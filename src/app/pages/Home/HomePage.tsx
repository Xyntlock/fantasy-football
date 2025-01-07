import { generateClient } from 'aws-amplify/api'
import { useEffect, useState } from 'react'
import type { Schema } from '../../../../amplify/data/resource'
import Page from '../Page'

const client = generateClient<Schema>()

type Player = {
  id: number
  name: string
  age: number
  number: number
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
}

const HomePage = () => {
  const [players, setPlayers] = useState<Array<Player>>([])

  useEffect(() => {
    client.queries.getApi().then((data) => {
      const json = JSON.parse(data.data as string)
      const response = json.response[0]

      setPlayers(response.players)
      console.log(response.players)
    })
  }, [])

  return (
    <Page>
      Home Page{' '}
      {players.map((player) => (
        <div key={player.id}>{player.name}</div>
      ))}
    </Page>
  )
}

export default HomePage
