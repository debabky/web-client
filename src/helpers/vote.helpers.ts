import { api } from '@/api'
import { VotePayload, VotingListResponse, VotingResponse } from '@/types'
import { JsonApiBodyBuilder } from '@distributedlab/jac'

export const getVotingList = async () =>
  api.get<VotingListResponse>('/integrations/voting-svc/voting/list')

export const getVotingById = async (voteId: number | string) =>
  api.get<VotingListResponse>(`/integrations/voting-svc/voting/list/${voteId}`)

export const postVote = async (vote: VotePayload) => {
  const body = new JsonApiBodyBuilder()
    .setData({
      type: 'vote',
      attributes: vote,
    })
    .build()

  return api.post<VotingResponse>('/integrations/voting-svc/voting/vote', {
    body,
  })
}
