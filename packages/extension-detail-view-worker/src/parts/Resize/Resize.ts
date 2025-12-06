import type { Dimensions } from '../Dimensions/Dimensions.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getPadding, getSideBarWidth } from '../GetPadding/GetPadding.ts'

export const resize = (state: ExtensionDetailState, dimensions: Dimensions): ExtensionDetailState => {
  const padding = getPadding(dimensions.width)
  const sideBarWidth = getSideBarWidth(dimensions.width)
  const showSideBar = sideBarWidth > 0
  return {
    ...state,
    ...dimensions,
    paddingLeft: padding,
    paddingRight: padding,
    showSideBar,
    sideBarWidth,
  }
}
