import { getCurrentUser } from 'aws-amplify/auth'
import { Button } from '../../components/Button/Button'
import Page from '../Page'
import type {
  Player,
  PositionEnum,
  Schema,
} from '../../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useState } from 'react'
import { Pagination } from 'flowbite-react'

const client = generateClient<Schema>()

const EditSquadPage = () => {
  const [nextToken, setNextToken] = useState<string | null | undefined>(null)

  const [currentGoalkeeperPage, setCurrentGoalkeeperPage] = useState(1)
  const [goalkeepers] = useState<Player[]>([])
  const [maxGoalkeeperPage, setMaxGoalkeeperPage] = useState(1)
  const [nextTokenGoalkeeper, setNextTokenGoalkeeper] = useState<
    string | null | undefined
  >(null)

  const [currentDefenderPage, setCurrentDefenderPage] = useState(1)
  const [defenders] = useState<Player[]>([])
  const [maxDefenderPage, setMaxDefenderPage] = useState(1)
  const [nextTokenDefender, setNextTokenDefender] = useState<
    string | null | undefined
  >(null)

  const [currentMidfielderPage, setCurrentMidfielderPage] = useState(1)
  const [midfielders] = useState<Player[]>([])
  const [maxMidfielderPage, setMaxMidfielderPage] = useState(1)
  const [nextTokenMidfielder, setNextTokenMidfielder] = useState<
    string | null | undefined
  >(null)

  const [currentAttackerPage, setCurrentAttackerPage] = useState(1)
  const [attackers] = useState<Player[]>([])
  const [maxAttackerPage, setMaxAttackerPage] = useState(1)
  const [nextTokenAttacker, setNextTokenAttacker] = useState<
    string | null | undefined
  >(null)

  const onClick = async () => {
    const { userId } = await getCurrentUser()
    await client.mutations.initSquad({ userId })
  }

  const onPageChange = (position: PositionEnum) => (pageNumber: number) => {
    let maxPage: number
    let setMaxPage: (value: React.SetStateAction<number>) => void
    let playerArray: Player[]
    let setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    let nextToken: string | null | undefined
    let setNextToken: React.Dispatch<
      React.SetStateAction<string | null | undefined>
    >

    switch (position) {
      case 'Goalkeeper':
        maxPage = maxGoalkeeperPage
        setMaxPage = setMaxGoalkeeperPage
        playerArray = goalkeepers
        setCurrentPage = setCurrentGoalkeeperPage
        nextToken = nextTokenGoalkeeper
        setNextToken = setNextTokenGoalkeeper
        break
      case 'Defender':
        maxPage = maxDefenderPage
        setMaxPage = setMaxDefenderPage
        playerArray = defenders
        setCurrentPage = setCurrentDefenderPage
        nextToken = nextTokenDefender
        setNextToken = setNextTokenDefender
        break
      case 'Midfielder':
        maxPage = maxMidfielderPage
        setMaxPage = setMaxMidfielderPage
        playerArray = midfielders
        setCurrentPage = setCurrentMidfielderPage
        nextToken = nextTokenMidfielder
        setNextToken = setNextTokenMidfielder
        break
      case 'Attacker':
        maxPage = maxAttackerPage
        setMaxPage = setMaxAttackerPage
        playerArray = attackers
        setCurrentPage = setCurrentAttackerPage
        nextToken = nextTokenAttacker
        setNextToken = setNextTokenAttacker
    }

    if (pageNumber <= maxPage) {
      console.log(playerArray)
    } else {
      client.models.Squads.listSquadsByPosition(
        { position },
        { limit: 10, nextToken }
      ).then((res) => {
        console.log(res)
        setNextToken(res.nextToken)
        setMaxPage(pageNumber)
        playerArray.push(...(res.data as Player[]))
      })
    }

    setCurrentPage(pageNumber)
  }

  return (
    <Page>
      <Pagination
        currentPage={currentGoalkeeperPage}
        onPageChange={onPageChange('Goalkeeper')}
        layout="table"
        totalPages={100}
      />
      <Pagination
        currentPage={currentDefenderPage}
        onPageChange={onPageChange('Defender')}
        layout="table"
        totalPages={100}
      />
      <Pagination
        currentPage={currentMidfielderPage}
        onPageChange={onPageChange('Midfielder')}
        layout="table"
        totalPages={100}
      />
      <Pagination
        currentPage={currentAttackerPage}
        onPageChange={onPageChange('Attacker')}
        layout="table"
        totalPages={100}
      />
      <Button onClick={onClick}>Create Squad</Button>
    </Page>
  )
}

export default EditSquadPage
