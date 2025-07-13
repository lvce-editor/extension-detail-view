import type { Feature } from '../Feature/Feature.ts'
import type { FeatureDefinition } from '../FeatureDefinition/FeatureDefinition.ts'
import type { FeatureDetailsHandler, FeatureDomHandler } from '../FeatureDetailsHandler/FeatureDetailsHandler.ts'
import { FeatureNotFoundError } from '../FeatureNotFoundError/FeatureNotFoundError.ts'

const features = Object.create(null) as Record<string, FeatureDefinition>

export const register = (feature: FeatureDefinition): void => {
  features[feature.id] = feature
}

export const getFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  const result: Feature[] = []

  for (const id in features) {
    const feature = features[id]
    if (feature.isEnabled(extension)) {
      result.push({
        id,
        label: feature.getLabel(),
        selected: selectedFeature === id,
      })
    }
  }

  return result
}

export const getFeatureDetailsHandler = (featureName: string): FeatureDetailsHandler => {
  const feature = features[featureName]
  if (!feature) {
    throw new FeatureNotFoundError(featureName)
  }
  return feature.getDetails
}

export const getFeatureVirtualDomHandler = (featureName: string): FeatureDomHandler => {
  const feature = features[featureName]
  if (!feature) {
    throw new FeatureNotFoundError(featureName)
  }
  return feature.getVirtualDom
}
