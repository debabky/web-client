import { VoteOptions, Voting } from '@/types'
import { JsonApiRecord } from '@distributedlab/jac'

export type JsonApiRelationship = Record<string, unknown>
export type Uuid = string
export type JsonApiRelationships = Record<
  string,
  JsonApiRelationship | JsonApiRelationship[]
>

export type JsonApiRecordBase<T extends string> = {
  id: Uuid
  type: T
  relationship_names?: JsonApiRelationships
}

export type VotingListResponse = JsonApiRecordBase<'vote'> & Voting[]

export type VotingResponse = JsonApiRecordBase<'vote'> & Voting
