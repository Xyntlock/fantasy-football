import { generateClient } from 'aws-amplify/api'
import { useEffect } from 'react'
import type { Schema } from '../../../../amplify/data/resource'
// import { PlayerCards } from '../../components/PlayerCard/PlayerCards'
import Page from '../Page'
// import type { Player } from '../../../types'
import { getCurrentUser } from 'aws-amplify/auth'

const client = generateClient<Schema>()

const ViewSquadPage = () => {
  // const [players, setPlayers] = useState<Player | null>(null)

  useEffect(() => {
    getCurrentUser().then((user) => {
      const { userId } = user
      client.queries.getSquad({ userId }).then((res) => {
        console.log(res.data)
      })
    })
  }, [])

  return <Page>{/* <PlayerCards squad={players} /> */}View Squad</Page>
}

export default ViewSquadPage
