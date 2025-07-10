import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getFeatureDetailsHandler } from '../GetFeatureDetailsHandler/GetFeatureDetailsHandler.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl, selectedFeature } = state
  const actualSelectedFeature = selectedFeature || InputName.Theme
  const fn = getFeatureDetailsHandler(actualSelectedFeature)
  const partialNewState = await fn(extension, baseUrl)
  return {
    ...state,
    selectedTab: InputName.Features,
    ...partialNewState,
  }
}
