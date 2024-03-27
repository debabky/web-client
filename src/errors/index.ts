import * as runtimeErrors from './runtime.errors'
import { errors as dlErrors } from '@distributedlab/jac'

export const errors = {
  ...runtimeErrors,
  ...dlErrors,
}
