import { generateClient } from 'aws-amplify/api'
import { useEffect } from 'react'
import type { Schema } from '../../../../amplify/data/resource'
import Page from '../Page'

const client = generateClient<Schema>()

const HomePage = () => {
  useEffect(() => {
    client.queries
      .getApi({
        name: 'Test',
      })
      .then((data) => {
        console.log(data)
      })
  }, [])

  return <Page>Home Page</Page>
}

export default HomePage
