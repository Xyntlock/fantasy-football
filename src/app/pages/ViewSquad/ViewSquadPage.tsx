import {
  PlayerCards,
  type Squad,
} from '../../components/PlayerCard/PlayerCards'
import Page from '../Page'

const ViewSquadPage = () => {
  return (
    <Page>
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      <PlayerCards squad={[] as any} />
    </Page>
  )
}

export default ViewSquadPage
