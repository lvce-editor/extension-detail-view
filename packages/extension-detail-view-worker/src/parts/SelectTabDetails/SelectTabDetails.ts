import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabDetails = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  // TODO load readmo markdown here
  return {
    ...state,
    selectedTab: InputName.Details,
  }
}
