import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getFeatureDetailsHandler } from '../FeatureRegistry/FeatureRegistry.ts'

export const selectFeature2 = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  if (!name) {
    return state
  }

  const { features, extension, baseUrl } = state
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

  const fn = getFeatureDetailsHandler(name)
  const partialNewState = await fn(extension, baseUrl)

  return {
    ...state,
    ...partialNewState,
    selectedFeature: name,
    features: newFeatures,
  }
}
