import { generateClient } from 'aws-amplify/api'
import { useEffect } from 'react'
import type { Schema } from '../../../../amplify/data/resource'
import Page from '../Page'

const client = generateClient<Schema>()

const HomePage = () => {
  // const [players, setPlayers] = useState<Array<Player>>(testPlayers)

  useEffect(() => {
    client.models.Squads.list().then((res) => console.log(res))
  }, [])

  return <Page>Home Page</Page>
}

export default HomePage
