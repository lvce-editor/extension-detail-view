import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTab = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  // TODO get features markdown here
  return {
    ...state,
    selectedTab: InputName.Features,
  }
}
