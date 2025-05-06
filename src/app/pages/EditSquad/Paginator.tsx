import { useEffect, useState } from 'react'
import type {
  Player,
  PositionEnum,
  Schema,
} from '../../../../amplify/data/resource'
import { Pagination } from 'flowbite-react'
import type { V6Client } from '@aws-amplify/api-graphql'
import { PlayerCard } from '../../components/PlayerCard/PlayerCard'

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
  const [shortlist, setShortlist] = useState<Player[]>([])

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

    const shortlist = getPageList({ pageNumber, list: players })
    setShortlist(shortlist)

    setCurrentPage(pageNumber)
  }

  if (!position) {
    return null
  }

  return (
    <>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        layout="navigation"
        totalPages={100}
      />
      {shortlist.map((player) => (
        <PlayerCard key={player.pk} player={player} height="m" width="m" />
      ))}
    </>
  )
}
