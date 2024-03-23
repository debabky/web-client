import { api } from '@/api'
import { VotePayload, VotingResponse } from '@/types'
import { JsonApiBodyBuilder } from '@distributedlab/jac'

export const getVotingList = async () => api.get('/voting')

export const postVote = async (vote: string) => {
  const body = new JsonApiBodyBuilder()
    .setData({
      vote,
    })
    .build()

  return api.post<VotingResponse>('/voting/vote', {
    body,
  })
}
