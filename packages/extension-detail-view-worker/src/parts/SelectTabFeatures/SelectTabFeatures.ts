import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  return {
    ...state,
    selectedTab: InputName.Features,
  }
}
