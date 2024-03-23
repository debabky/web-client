export type VotePayload = {
  votingId: string
  votingOption: string
  nullifier: string
  rank: number
}

export type Voting = {
  name: string
  description: string
  createdAt: string
  activeUntil: string
}
