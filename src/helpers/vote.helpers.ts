import { api } from '@/api'
import { VotePayload, VotingListResponse, VotingResponse } from '@/types'
import { JsonApiBodyBuilder } from '@distributedlab/jac'

export const getVotingList = async () =>
  api.get<VotingListResponse>('/voting/list?include=options')

export const getVotingById = async (voteId: number | string) =>
  api.get<VotingResponse>(`/voting/${voteId}?include=options`)

export const postVote = async (
  vote: { votingOption: string }[],
  token: string,
) => {
  const body = new JsonApiBodyBuilder()
    .setData({
      type: 'revoke-admin',
      attributes: {
        data: vote,
      },
    })
    .build()

  return api.post<VotingResponse>('/voting/vote', {
    body,
    headers: { authorization: token ?? 'test' },
  })
}
