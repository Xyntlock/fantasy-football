import { generateClient } from 'aws-amplify/api'
import type { Schema } from '../../../../amplify/data/resource'
import Page from '../Page'

const client = generateClient<Schema>()

const HomePage = () => {
  client.queries.getApi({
    name: 'Test',
  })

  return <Page>Home Page</Page>
}

export default HomePage
