import type { Squad } from '../../../types'
import { PlayerCard } from '../../components/PlayerCard/PlayerCard'

type PlayerCardProps = {
  squad: Squad | null
}

export const PlayerCards = ({ squad }: PlayerCardProps) => {
  if (!squad) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className="grid grid-rows-3 gap-4">
        <div className="grid grid-cols-4 justify-self-center gap-36">
          <div className="col-start-2">
            <button type="button" onClick={() => console.log('lcf')}>
              <PlayerCard player={squad.lcf} width="m" height="m" />
            </button>
          </div>
          <button type="button" onClick={() => console.log('rcf')}>
            <PlayerCard player={squad.rcf} width="m" height="m" />
          </button>
        </div>
        <div className="grid grid-cols-4 justify-self-center gap-36">
          <button type="button" onClick={() => console.log('lm')}>
            <PlayerCard player={squad.lm} width="m" height="m" />
          </button>
          <button type="button" onClick={() => console.log('lcm')}>
            <PlayerCard player={squad.lcm} width="m" height="m" />
          </button>
          <button type="button" onClick={() => console.log('rcm')}>
            <PlayerCard player={squad.rcm} width="m" height="m" />
          </button>
          <button type="button" onClick={() => console.log('rm')}>
            <PlayerCard player={squad.rm} width="m" height="m" />
          </button>
        </div>
        <div className="grid grid-cols-4 justify-self-center gap-36">
          <button type="button" onClick={() => console.log('lb')}>
            <PlayerCard player={squad.lb} width="m" height="m" />
          </button>
          <button type="button" onClick={() => console.log('lcb')}>
            <PlayerCard player={squad.lcb} width="m" height="m" />
          </button>
          <button type="button" onClick={() => console.log('rcb')}>
            <PlayerCard player={squad.rcb} width="m" height="m" />
          </button>
          <button type="button" onClick={() => console.log('rb')}>
            <PlayerCard player={squad.rb} width="m" height="m" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button type="button" onClick={() => console.log('gk')}>
          <PlayerCard player={squad.gk} width="m" height="m" />
        </button>
      </div>
    </>
  )
}
