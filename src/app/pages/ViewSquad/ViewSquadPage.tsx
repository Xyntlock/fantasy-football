import { generateClient } from 'aws-amplify/api'
import { useEffect, useState } from 'react'
import type { Schema } from '../../../../amplify/data/resource'
import { PlayerCards } from '../../components/PlayerCard/PlayerCards'
import Page from '../Page'
import { getCurrentUser } from 'aws-amplify/auth'
import type { GetSquadResponse, Squad } from '../../../types'

const client = generateClient<Schema>()

const ViewSquadPage = () => {
  const [players, setPlayers] = useState<Squad | null>(null)

  useEffect(() => {
    getCurrentUser().then((user) => {
      const { userId } = user
      client.queries.getSquad({ userId }).then((res) => {
        const data: GetSquadResponse = JSON.parse(res.data as string)
        setPlayers(data.squadPlayers)
      })
    })
  }, [])

  return (
    <Page>
      <PlayerCards squad={players} />
    </Page>
  )
}

export default ViewSquadPage
