type Team = {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

type Venue = {
  id: number
  name: string
  address: string
  city: string
  capacity: number
  surface: string
  image: string
}

type TeamInformation = {
  team: Team
  venue: Venue
}

export type GetTeamsResponse = {
  get: 'teams'
  parameters: {
    league?: string
    season?: string
  }
  errors: unknown[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: TeamInformation[]
}

type Player = {
  id: number
  name: string
  firstname: string
  lastname: string
  age: number
  birth: {
    date: string
    place: string
    country: string
  }
  nationality: string
  height: string
  weight: string
  injured: boolean
  photo: string
}

type PlayerStatistics = {
  team: {
    id: number | null
    name: string | null
    logo: string | null
  }
  league: {
    id: number | null
    name: string | null
    country: string | null
    logo: string | null
    flag: string | null
    season: number | null
  }
  games: {
    appearences: number | null
    lineups: number | null
    minutes: number | null
    number: number | null
    position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
    rating: string | null
    captain: boolean
  }
  substitutes: {
    in: number | null
    out: number | null
    bench: number | null
  }
  shots: {
    total: number | null
    on: number | null
  }
  goals: {
    total: number | null
    conceded: number | null
    assists: number | null
    saves: number | null
  }
  passes: {
    total: number | null
    key: number | null
    accuracy: number | null
  }
  tackles: {
    total: number | null
    blocks: number | null
    interceptions: number | null
  }
  duels: {
    total: number | null
    won: number | null
  }
  dribbles: {
    attempts: number | null
    success: number | null
    past: number | null
  }
  fouls: {
    drawn: number | null
    committed: number | null
  }
  cards: {
    yellow: number | null
    yellowred: number | null
    red: number | null
  }
  penalty: {
    won: number | null
    commited: number | null
    scored: number | null
    missed: number | null
    saved: number | null
  }
}

export type PlayerInformation = {
  player: Player
  statistics: PlayerStatistics[]
}

export type GetPlayersResponse = {
  get: 'players'
  parameters: {
    league?: string
    season?: string
  }
  errors: unknown[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: PlayerInformation[]
}
