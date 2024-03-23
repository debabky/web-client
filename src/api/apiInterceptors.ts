import {
  HTTP_STATUS_CODES,
  JsonApiResponseErrors,
  JsonApiRecord,
} from '@distributedlab/jac'
import { errors } from '@/errors'
import { FetcherResponse } from '@distributedlab/fetcher'
import { camelizeKeys } from 'humps'

export const attachErrorHandler = async (
  response: FetcherResponse<JsonApiResponseErrors>,
) => {
  const isUnauthorized = response?.status === HTTP_STATUS_CODES.UNAUTHORIZED

  if (!isUnauthorized) {
    switch (response?.status) {
      case HTTP_STATUS_CODES.METHOD_NOT_ALLOWED:
        throw errors.MethodNotAllowed

      case HTTP_STATUS_CODES.BAD_REQUEST:
        throw errors.BadRequestError

      case HTTP_STATUS_CODES.CONFLICT:
        throw errors.ConflictError

      case HTTP_STATUS_CODES.UNAUTHORIZED:
        throw errors.UnauthorizedError

      case HTTP_STATUS_CODES.FORBIDDEN:
        throw errors.ForbiddenError

      case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
        throw errors.InternalServerError

      default:
        throw errors.RuntimeError
    }
  }
  throw errors.TokenExpiredError
}

export const attachCaseConverter = (
  response: FetcherResponse<JsonApiRecord>,
) => {
  return new Promise<FetcherResponse<JsonApiRecord>>(resolve => {
    resolve(camelizeKeys(response) as FetcherResponse<JsonApiRecord>)
  })
}
