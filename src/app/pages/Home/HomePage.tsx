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
    client.models.Squads.get({
      pk: '1234',
    }).then((res) => console.log(res))
  }, [])

  return <Page>Home Page</Page>
}

export default HomePage
