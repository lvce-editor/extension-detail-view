import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'

export class GithubReleasesError extends Error {
  readonly code = ErrorCodes.E_GITHUB_RELEASES

  constructor(message: string) {
    super(message)
    this.name = 'GithubReleasesError'
  }
}
