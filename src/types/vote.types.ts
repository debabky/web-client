export type VotePayload = {
  votingOption: string
  rank: number
}

export type Voting = {
  name: string
  description: string
  createdAt: string
  activeUntil: string
}

export type VoteOptions = {
  included: [
    {
      id: string
      type: string
      attributes: {
        name: string
        voting_id: string
      }
    },
  ]
}

export type VoteOption = {
  id: string
  type: string
  attributes: {
    name: string
    voting_id: string
  }
}
