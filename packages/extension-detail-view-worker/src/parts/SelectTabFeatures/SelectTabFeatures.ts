import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl, selectedFeature, features, tabs, locationProtocol } = state
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
  return {
    ...state,
    selectedTab: InputName.Features,
    selectedFeature: features[0].id || '',
    tabs: newTabs,
    ...partialNewState,
  }
}
