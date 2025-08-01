import type { Feature } from '../Feature/Feature.ts'
import type { FeatureDefinition } from '../FeatureDefinition/FeatureDefinition.ts'
import type { FeatureDetailsHandler, FeatureDomHandler } from '../FeatureDetailsHandler/FeatureDetailsHandler.ts'
import { FeatureNotFoundError } from '../FeatureNotFoundError/FeatureNotFoundError.ts'
import { getFeatureUnsupportedVirtualDom } from '../FeatureUnsupportedVirtualDom/FeatureUnsupportedVirtualDom.ts'

const features: Record<string, FeatureDefinition> = Object.create(null)

export const register = (feature: FeatureDefinition): void => {
  features[feature.id] = feature
}

export const has = (id: string): boolean => {
  return id in features
}

export const getFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  const allFeatures = Object.values(features)
  const enabledFeatures = allFeatures.filter((item) => item.isEnabled(extension))
  const converted: readonly Feature[] = enabledFeatures.map((item) => {
    return {
      id: item.id,
      label: item.getLabel(),
      selected: item.id === selectedFeature,
    }
  })

  return converted
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
    return getFeatureUnsupportedVirtualDom
  }
  return feature.getVirtualDom
}

export const clearRegistry = (): void => {
  for (const key of Object.keys(features)) {
    delete features[key]
  }
}
