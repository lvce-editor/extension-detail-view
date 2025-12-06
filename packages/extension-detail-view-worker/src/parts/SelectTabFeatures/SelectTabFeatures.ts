import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { baseUrl, extension, features, locationProtocol, selectedFeature, tabs } = state
  if (features.length === 0) {
    return state
  }
  const actualSelectedFeature = selectedFeature || InputName.Theme
  const fn = FeatureRegistry.getFeatureDetailsHandler(actualSelectedFeature)
  const partialNewState = await fn(extension, baseUrl, locationProtocol)
  const newTabs = tabs.map((tab) => {
    return {
      ...tab,
      selected: tab.name === InputName.Features,
    }
  })
  const newFeatures = features.map((feature) => {
    if (feature.id === actualSelectedFeature) {
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
    ...partialNewState,
    features: newFeatures,
    selectedFeature: features[0].id || '',
    selectedTab: InputName.Features,
    tabs: newTabs,
  }
}
