import { generateClient } from 'aws-amplify/api'
import { useEffect } from 'react'
import type { Schema } from '../../../../amplify/data/resource'
import Page from '../Page'

const client = generateClient<Schema>()

const HomePage = () => {
  // const [players, setPlayers] = useState<Array<Player>>(testPlayers)

  // useEffect(() => {
  //   client.queries.getApi().then((data) => {
  //     const json = JSON.parse(data.data as string)
  //     const response = json.response[0]

  //     setPlayers(response.players)
  //     console.log(response.players)
  //   })
  // }, [])

  useEffect(() => {
    const response = client.models.Squads.get({ id: '1234' })
    console.log(response)
  }, [])

  return <Page>Home Page</Page>
}

export default HomePage
