import { getCurrentUser } from 'aws-amplify/auth'
import { Button } from '../../components/Button/Button'
import Page from '../Page'
import type { PositionEnum, Schema } from '../../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useState } from 'react'
import { Paginator } from './Paginator'

const client = generateClient<Schema>()

const EditSquadPage = () => {
  const [position, setPosition] = useState<PositionEnum | null>(null)

  const onClick = async () => {
    const { userId } = await getCurrentUser()
    await client.mutations.initSquad({ userId })
  }

  return (
    <Page>
      <Button onClick={() => setPosition('Defender')}>Defenders</Button>
      <Paginator position={position} client={client} />
      <Button onClick={onClick}>Create Squad</Button>
    </Page>
  )
}

export default EditSquadPage
