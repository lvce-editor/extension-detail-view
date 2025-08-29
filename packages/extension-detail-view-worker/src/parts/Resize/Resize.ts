import type { Dimensions } from '../Dimensions/Dimensions.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const resize = (state: ExtensionDetailState, dimensions: Dimensions): ExtensionDetailState => {
  const { showAdditionalDetailsBreakpoint } = state
  const showSideBar = dimensions.width > showAdditionalDetailsBreakpoint
  return {
    ...state,
    ...dimensions,
    showSideBar,
  }
}
