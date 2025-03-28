import { getCurrentUser } from 'aws-amplify/auth'
import { Button } from '../../components/Button/Button'
import Page from '../Page'
import type { Schema } from '../../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/api'

const client = generateClient<Schema>()

const EditSquadPage = () => {
  const onClick = async () => {
    const { userId } = await getCurrentUser()
  }

  return (
    <Page>
      <Button>Create Squad</Button>
    </Page>
  )
}

export default EditSquadPage
