export class FeatureNotFoundError extends Error {
  constructor(featureName: string) {
    super(`unknown feature: ${featureName}`)
    this.name = 'FeatureNotFoundError'
  }
}