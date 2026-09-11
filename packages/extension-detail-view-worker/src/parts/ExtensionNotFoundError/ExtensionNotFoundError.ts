import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'

export class ExtensionNotFoundError extends Error {
  readonly code = ErrorCodes.E_EXTENSION_NOT_FOUND

  constructor(extensionId: string) {
    super(`extension not found: ${extensionId}`)
    this.name = 'ExtensionNotFoundError'
  }
}
