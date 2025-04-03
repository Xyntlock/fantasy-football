import type { Player, Squad as SquadData } from '../amplify/data/resource'

export type Squad = {
  gk: Player
  lb: Player
  lcb: Player
  rcb: Player
  rb: Player
  lm: Player
  lcm: Player
  rcm: Player
  rm: Player
  lcf: Player
  rcf: Player
}

export type GetSquadResponse = {
  squad: SquadData
  squadPlayers: Squad
}
