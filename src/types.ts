export type Player = {
  id: number
  name: string
  age: number
  number: number | null
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
  photo: string
}
