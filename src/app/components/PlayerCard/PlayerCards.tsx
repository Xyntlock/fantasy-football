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

const testPlayers = {
  goalkeeper: {
    id: 18959,
    name: 'Robert Sánchez',
    age: 28,
    number: 1,
    position: 'Goalkeeper',
    photo: 'https://media.api-sports.io/football/players/18959.png',
  },
  lb: {
    id: 21998,
    name: 'A. Disasi',
    age: 27,
    number: 2,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/21998.png',
  },
  lcb: {
    id: 47380,
    name: 'Marc Cucurella',
    age: 27,
    number: 3,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/47380.png',
  },
  rcb: {
    id: 19145,
    name: 'T. Adarabioyo',
    age: 28,
    number: 4,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/19145.png',
  },
  rb: {
    id: 95,
    name: 'B. Badiashile',
    age: 24,
    number: 5,
    position: 'Defender',
    photo: 'https://media.api-sports.io/football/players/95.png',
  },
  lm: {
    id: 5996,
    name: 'E. Fernández',
    age: 24,
    number: 8,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/5996.png',
  },
  lcm: {
    id: 63577,
    name: 'M. Mudryk',
    age: 24,
    number: 10,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/63577.png',
  },
  rcm: {
    id: 138935,
    name: 'C. Chukwuemeka',
    age: 22,
    number: 17,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/138935.png',
  },
  rm: {
    id: 152982,
    name: 'C. Palmer',
    age: 23,
    number: 20,
    position: 'Midfielder',
    photo: 'https://media.api-sports.io/football/players/152982.png',
  },
  lf: {
    id: 1864,
    name: 'Pedro Neto',
    age: 25,
    number: 7,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/1864.png',
  },
  rf: {
    id: 136723,
    name: 'N. Madueke',
    age: 23,
    number: 11,
    position: 'Attacker',
    photo: 'https://media.api-sports.io/football/players/136723.png',
  },
}

export const PlayerCards = ({
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  squad = testPlayers as any,
}: PlayerCardProps) => {
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
