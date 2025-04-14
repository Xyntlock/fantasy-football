import { getCurrentUser } from 'aws-amplify/auth'
import { Button } from '../../components/Button/Button'
import Page from '../Page'
import type { Player, Schema } from '../../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useState } from 'react'
import { Pagination } from 'flowbite-react'

const client = generateClient<Schema>()

const EditSquadPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [nextToken, setNextToken] = useState<string | null | undefined>(null)
  const [defenders] = useState<Player[]>([])
  const [maxDefenderPage, setMaxDefenderPage] = useState(1)

  const onClick = async () => {
    const { userId } = await getCurrentUser()
    await client.mutations.initSquad({ userId })
  }

  const onPageChange = (pageNumber: number) => {
    if (pageNumber <= maxDefenderPage) {
      console.log(defenders)
    } else {
      client.models.Squads.listSquadsByPosition(
        { position: 'Defender' },
        { limit: 10, nextToken }
      ).then((res) => {
        console.log(res)
        setNextToken(res.nextToken)
        setMaxDefenderPage(pageNumber)
        defenders.push(...(res.data as Player[]))
      })
    }

    setCurrentPage(pageNumber)
  }

  return (
    <Page>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        layout="table"
        totalPages={100}
      />
      <Button onClick={onClick}>Create Squad</Button>
    </Page>
  )
}

export default EditSquadPage
