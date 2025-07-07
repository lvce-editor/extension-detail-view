import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'

export const isEnoentError = (error: unknown): boolean => {
  return error && 'code' in error && error.code === ErrorCodes.ENOENT
}
