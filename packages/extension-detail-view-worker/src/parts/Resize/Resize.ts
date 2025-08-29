import type { Dimensions } from '../Dimensions/Dimensions.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getPadding, getSideBarWidth } from '../GetPadding/GetPadding.ts'

export const resize = (state: ExtensionDetailState, dimensions: Dimensions): ExtensionDetailState => {
  const { showAdditionalDetailsBreakpoint } = state
  const showSideBar = dimensions.width > showAdditionalDetailsBreakpoint
  const padding = getPadding(dimensions.width)
  const sideBarWidth = getSideBarWidth(dimensions.width)
  return {
    ...state,
    ...dimensions,
    showSideBar,
    paddingLeft: padding,
    paddingRight: padding,
    sideBarWidth,
  }
}
