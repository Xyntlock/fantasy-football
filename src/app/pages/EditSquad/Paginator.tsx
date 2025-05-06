import { useEffect, useState } from 'react'
import type {
  Player,
  PositionEnum,
  Schema,
} from '../../../../amplify/data/resource'
import { Pagination } from 'flowbite-react'
import type { V6Client } from '@aws-amplify/api-graphql'
import { PlayerCard } from '../../components/PlayerCard/PlayerCard'
import { create } from 'zustand'

type PaginatorProps = {
  position: PositionEnum
  client: V6Client<Schema>
}

type GetPageList = (params: {
  pageNumber: number
  list: Array<Player>
}) => Array<Player>

type PushPlayerFunction = (newPlayers: Player[]) => void

type PlayerStore = {
  goalkeepers: Set<Player>
  defenders: Set<Player>
  midfielders: Set<Player>
  attackers: Set<Player>
  pushGoalkeepers: PushPlayerFunction
  pushDefenders: PushPlayerFunction
  pushMidfielders: PushPlayerFunction
  pushAttackers: PushPlayerFunction
}

// need to store nextToken for each set of players
// Can replace set back with array I think
const useStore = create<PlayerStore>((set) => ({
  goalkeepers: new Set<Player>(),
  defenders: new Set<Player>(),
  midfielders: new Set<Player>(),
  attackers: new Set<Player>(),
  pushGoalkeepers: (newGoalkeepers: Player[]) =>
    set(({ goalkeepers }: { goalkeepers: Set<Player> }) => {
      const playerArray = Array.from(goalkeepers)

      for (const goalkeeper of newGoalkeepers) {
        if (
          !playerArray.some((existingGk) => existingGk.pk === goalkeeper.pk)
        ) {
          goalkeepers.add(goalkeeper)
        }
      }

      return {
        goalkeepers,
      }
    }),
  pushDefenders: (newDefenders: Player[]) =>
    set(({ defenders }: { defenders: Set<Player> }) => {
      const playerArray = Array.from(defenders)

      for (const defender of newDefenders) {
        if (
          !playerArray.some((existingDef) => existingDef.pk === defender.pk)
        ) {
          defenders.add(defender)
        }
      }

      return {
        defenders,
      }
    }),
  pushMidfielders: (newMidfielders: Player[]) =>
    set(({ midfielders }: { midfielders: Set<Player> }) => {
      const playerArray = Array.from(midfielders)

      for (const midfielder of newMidfielders) {
        if (
          !playerArray.some((existingMid) => existingMid.pk === midfielder.pk)
        ) {
          midfielders.add(midfielder)
        }
      }

      return {
        midfielders,
      }
    }),
  pushAttackers: (newAttackers: Player[]) =>
    set(({ attackers }: { attackers: Set<Player> }) => {
      const playerArray = Array.from(attackers)

      for (const attacker of newAttackers) {
        if (
          !playerArray.some((existingAtt) => existingAtt.pk === attacker.pk)
        ) {
          attackers.add(attacker)
        }
      }

      return {
        attackers,
      }
    }),
}))

const getPageList: GetPageList = ({ pageNumber, list }) => {
  const startIndex = (pageNumber - 1) * 10
  const endIndex = startIndex + 10
  return list.slice(startIndex, endIndex)
}

const getMaxPages = (pageItemLimit: number, list: Player[]): number => {
  // Handle edge cases
  if (pageItemLimit <= 0) {
    throw new Error('Page item limit must be greater than zero')
  }

  if (!list || list.length === 0) {
    return 0
  }

  // Calculate max pages by dividing total items by items per page
  // and rounding up to include partial pages
  return Math.ceil(list.length / pageItemLimit)
}

export const Paginator = ({ position, client }: PaginatorProps) => {
  const [nextToken, setNextToken] = useState<string | null | undefined>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [shortlist, setShortlist] = useState<Player[]>([])

  let playerSetFunction: (state: PlayerStore) => Set<Player>
  let pushPlayersFunction: (state: PlayerStore) => (players: Player[]) => void

  switch (position) {
    case 'Goalkeeper':
      playerSetFunction = (state) => state.goalkeepers
      pushPlayersFunction = (state) => state.pushGoalkeepers
      break
    case 'Defender':
      playerSetFunction = (state) => state.defenders
      pushPlayersFunction = (state) => state.pushDefenders
      break
    case 'Midfielder':
      playerSetFunction = (state) => state.midfielders
      pushPlayersFunction = (state) => state.pushMidfielders
      break
    case 'Attacker':
      playerSetFunction = (state) => state.attackers
      pushPlayersFunction = (state) => state.pushAttackers
  }

  const playerSet: Set<Player> = useStore(playerSetFunction)
  const pushPlayers = useStore(pushPlayersFunction)

  useEffect(() => {
    if (position) {
      onPageChange(1)
    }
  }, [position])

  useEffect(() => {
    if (playerSet) {
      const playerArray = Array.from(playerSet)
      const maxPage = getMaxPages(10, playerArray)
      setMaxPage(maxPage)
      console.log('setting max page to ', maxPage)
    }
  }, [playerSet, playerSet.size])

  const onPageChange = async (pageNumber: number) => {
    if (!position) {
      return
    }

    if (pageNumber > maxPage) {
      const res = await client.models.Squads.listSquadsByPosition(
        { position },
        { limit: 10, nextToken }
      )
      console.log(res)
      setNextToken(res.nextToken)
      pushPlayers(res.data as Player[])
    }

    const playerArray = Array.from(playerSet)
    const shortlist = getPageList({ pageNumber, list: playerArray })
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
