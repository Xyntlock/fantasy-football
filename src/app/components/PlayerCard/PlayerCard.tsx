import { Card } from 'flowbite-react'
import type { Player } from '../../../types'

type PlayerCardProps = {
  player: Player
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  return <Card>{player.name}</Card>
}
