export type VotePayload = {
  votingOption: string
  rank: number
}

export type Voting = {
  name: string
  id: string
  description: string
  createdAt: string
  activeUntil: string
  options: VoteOptions[]
}

export type VoteOptions = {
  id: string
  type: string
  attributes: {
    id: number
    name: string
    points: number
    votingId: string
  }
}
