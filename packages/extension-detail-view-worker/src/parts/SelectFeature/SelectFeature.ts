import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const selectFeature = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  const { features } = state
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
  return {
    ...state,
    selectedFeature: name,
    features: newFeatures,
  }
}
