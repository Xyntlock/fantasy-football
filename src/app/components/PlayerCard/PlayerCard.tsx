import { Card } from 'flowbite-react'
import type { ComponentProps } from 'react'
import type * as Styled from './PlayerCard.styles'
import type {
  Player,
  PositionEnum,
  ShorthandPositionEnum,
} from '../../../../amplify/data/resource'

type PlayerCardProps = {
  player: Player | null
  width: Exclude<Styled.PlayerCardVariants['width'], null>
  height: Exclude<Styled.PlayerCardVariants['height'], null>
} & ComponentProps<typeof Card>

type CoreInfoProps = {
  name: string
  position: ShorthandPositionEnum
}

const convertPositionToString = (
  position: ShorthandPositionEnum
): PositionEnum => {
  switch (position) {
    case 'gk':
      return 'Goalkeeper'
    case 'lb':
    case 'lcb':
    case 'rcb':
    case 'rb':
      return 'Defender'
    case 'lcm':
    case 'lm':
    case 'rcm':
    case 'rm':
      return 'Midfielder'
    case 'lcf':
    case 'rcf':
      return 'Attacker'
  }
}

const CoreInfoContainer = ({ name, position }: CoreInfoProps) => {
  return (
    <div className="flex items-center flex-col">
      <div>{name}</div>
      <div>{convertPositionToString(position)}</div>
    </div>
  )
}

type StatsContainerProps = {
  player: Player
}

const StatsContainer = ({ player: { age, price } }: StatsContainerProps) => {
  return (
    <div className="grid grid-cols-2">
      <div>Age: {age}</div>
      <div>Number: 1</div>
      <div>Price: £{Number(price).toFixed(2)}m</div>
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
      {player && (
        <>
          <CoreInfoContainer
            name={player?.name}
            position={player?.position as ShorthandPositionEnum}
          />
          <StatsContainer player={player} />
        </>
      )}
    </Card>
  )
}
