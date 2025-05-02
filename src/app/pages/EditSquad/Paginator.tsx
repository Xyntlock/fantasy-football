import { useEffect, useState } from 'react'
import type {
  Player,
  PositionEnum,
  Schema,
} from '../../../../amplify/data/resource'
import { Pagination } from 'flowbite-react'
import type { V6Client } from '@aws-amplify/api-graphql'

type PaginatorProps = {
  position: PositionEnum | null
  client: V6Client<Schema>
}

type GetPageList = (params: {
  pageNumber: number
  list: Array<Player>
}) => Array<Player>

const getPageList: GetPageList = ({ pageNumber, list }) => {
  const startIndex = (pageNumber - 1) * 10
  const endIndex = startIndex + 10
  return list.slice(startIndex, endIndex)
}

export const Paginator = ({ position, client }: PaginatorProps) => {
  const [nextToken, setNextToken] = useState<string | null | undefined>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [players] = useState<Player[]>([])
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    if (position) {
      onPageChange(1)
    }
  }, [position])

  const onPageChange = async (pageNumber: number) => {
    if (!position) {
      return
    }

    if (pageNumber <= maxPage) {
      const shortlist = getPageList({ pageNumber, list: players })
      console.log(shortlist)
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

  if (!position) {
    return null
  }

  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      layout="navigation"
      totalPages={100}
    />
  )
}
