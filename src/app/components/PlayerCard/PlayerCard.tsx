import { Card } from 'flowbite-react'
import type { ComponentProps } from 'react'
import type * as Styled from './PlayerCard.styles'
import type { Player } from '../../../../amplify/data/resource'

type PlayerCardProps = {
  player: Player | null
  width: Exclude<Styled.PlayerCardVariants['width'], null>
  height: Exclude<Styled.PlayerCardVariants['height'], null>
} & ComponentProps<typeof Card>

type CoreInfoProps = {
  name?: string
  position?: string
}

const CoreInfoContainer = ({ name, position }: CoreInfoProps) => {
  return (
    <div className="flex items-center flex-col">
      <div>{name}</div>
      <div>{position}</div>
    </div>
  )
}

type StatsContainerProps = {
  age?: number
  number?: number | null
}

const StatsContainer = ({ age, number }: StatsContainerProps) => {
  return (
    <div className="grid grid-cols-2">
      <div>Age: {age}</div>
      <div>Number: {number || 0}</div>
    </div>
  )
}

export const PlayerCard = ({
  player,
  width,
  height,
  className = '',
}: PlayerCardProps) => {
  return (
    <Card className="w-60 flex items-center flex-col">
      <img
        src={player?.photo}
        alt={player?.name}
        className="h-24 w-24 rounded-full self-center"
      />
      <CoreInfoContainer name={player?.name} position={player?.position} />
      <StatsContainer age={player?.age} number={1} />
    </Card>
  )
}
