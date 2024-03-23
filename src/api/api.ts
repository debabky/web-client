import { config } from '@/config'
import { JsonApiClient } from '@distributedlab/jac'
import { attachErrorHandler, attachCaseConverter } from './apiInterceptors'

export const api = new JsonApiClient(
  { baseUrl: config.API_URL, credentials: 'include' },
  [{ error: attachErrorHandler }, { response: attachCaseConverter }],
)
