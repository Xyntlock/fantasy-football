import type { Player } from '../../../types'
import { PlayerCard } from './PlayerCard'

export type Squad = {
  goalkeeper: Player
  lb: Player
  lcb: Player
  rcb: Player
  rb: Player
  lm: Player
  lcm: Player
  rcm: Player
  rm: Player
  lf: Player
  rf: Player
}

type PlayerCardProps = {
  squad: Squad
}

export const PlayerCards = ({ squad }: PlayerCardProps) => {
  return (
    <>
      <div className="grid grid-rows-3 gap-4">
        <div className="grid grid-cols-4 justify-self-center gap-36">
          <div className="col-start-2">
            <PlayerCard player={squad.lf} width="m" height="m" />
          </div>
          <PlayerCard player={squad.rf} width="m" height="m" />
        </div>
        <div className="grid grid-cols-4 justify-self-center gap-36">
          <PlayerCard player={squad.lm} width="m" height="m" />
          <PlayerCard player={squad.lcm} width="m" height="m" />
          <PlayerCard player={squad.rcm} width="m" height="m" />
          <PlayerCard player={squad.rm} width="m" height="m" />
        </div>
        <div className="grid grid-cols-4 justify-self-center gap-36">
          <PlayerCard player={squad.lb} width="m" height="m" />
          <PlayerCard player={squad.lcb} width="m" height="m" />
          <PlayerCard player={squad.rcb} width="m" height="m" />
          <PlayerCard player={squad.rb} width="m" height="m" />
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <PlayerCard player={squad.goalkeeper} width="m" height="m" />
      </div>
    </>
  )
}
