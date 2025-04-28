import { useState } from 'react'
import type { Player, PositionEnum } from '../../../../amplify/data/resource'
import { Pagination } from 'flowbite-react'

type PaginatorProps = {
  position: PositionEnum | null
  client: any
}

export const Paginator = ({ position, client }: PaginatorProps) => {
  if (!position) {
    return null
  }

  const [nextToken, setNextToken] = useState<string | null | undefined>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [players] = useState<Player[]>([])
  const [maxPage, setMaxPage] = useState(1)

  const onPageChange = async (pageNumber: number) => {
    if (pageNumber <= maxPage) {
      console.log(players)
    } else {
      const res = await client.models.Squads.listSquadsByPosition(
        { position },
        { limit: 10, nextToken }
      )
      console.log(res)
      setNextToken(res.nextToken)
      setMaxPage(pageNumber)
      players.push(...(res.data as Player[]))
    }

    setCurrentPage(pageNumber)
  }

  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      layout="table"
      totalPages={100}
    />
  )
}
