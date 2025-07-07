import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'

export const isEnoentError = (error: any): boolean => {
  return error && error.code === ErrorCodes.ENOENT
}
