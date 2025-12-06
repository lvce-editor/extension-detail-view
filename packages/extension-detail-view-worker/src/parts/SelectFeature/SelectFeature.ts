import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'

export const selectFeature = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  if (!name) {
    return state
  }
  const { baseUrl, extension, features, locationProtocol } = state
  const newFeatures = features.map((feature) => {
    if (feature.id === name) {
      return {
        ...feature,
        selected: true,
      }
    }
    return {
      ...feature,
      selected: false,
    }
  })
  const fn = FeatureRegistry.getFeatureDetailsHandler(name)
  const partialNewState = await fn(extension, baseUrl, locationProtocol)
  return {
    ...state,
    ...partialNewState,
    features: newFeatures,
    selectedFeature: name,
  }
}
