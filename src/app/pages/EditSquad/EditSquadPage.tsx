import { getCurrentUser } from 'aws-amplify/auth'
import { Button } from '../../components/Button/Button'
import Page from '../Page'
import type { PositionEnum, Schema } from '../../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useEffect, useState } from 'react'
import { Paginator } from './Paginator'
import type { GetSquadResponse, Squad } from '../../../types'
import { PlayerCards } from './PlayerCards'
import type { V6Client } from '@aws-amplify/api-graphql'

const client = generateClient<Schema>()

const EditSquadPage = () => {
  const [position, setPosition] = useState<PositionEnum | null>(null)
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

  const onClick = async () => {
    const { userId } = await getCurrentUser()
    await client.mutations.initSquad({ userId })
  }

  const handleOnCardClick = (position: PositionEnum) => {
    setPosition(position)
  }

  if (position) {
    return (
      <Page>
        <Paginator position={position} client={client as V6Client<Schema>} />
        <Button onClick={() => setPosition(null)}>Back to Squad</Button>
      </Page>
    )
  }

  return (
    <Page>
      <PlayerCards squad={players} onClick={handleOnCardClick} />
      <Button onClick={onClick}>Create Squad</Button>
    </Page>
  )
}

export default EditSquadPage
