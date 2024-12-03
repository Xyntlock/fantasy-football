import { generateClient } from 'aws-amplify/api'
import type { Schema } from '../../../../amplify/data/resource'
import Page from '../Page'

const client = generateClient<Schema>()

const HomePage = () => {
  const value = client.queries.getApi({
    name: 'Test',
  })

  console.log(value)

  return <Page>Home Page</Page>
}

export default HomePage
