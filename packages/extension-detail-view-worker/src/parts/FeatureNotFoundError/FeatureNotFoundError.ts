import * as ErrorCodes from '../ErrorCodes/ErrorCodes.ts'

export class FeatureNotFoundError extends Error {
  readonly code = ErrorCodes.E_FEATURE_NOT_FOUND

  constructor(featureName: string) {
    super(`unknown feature: ${featureName}`)
    this.name = 'FeatureNotFoundError'
  }
}
