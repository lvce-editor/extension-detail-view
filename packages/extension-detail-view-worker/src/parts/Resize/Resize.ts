import type { Dimensions } from '../Dimensions/Dimensions.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getResponsiveLayout } from '../GetResponsiveLayout/GetResponsiveLayout.ts'

export const resize = (state: ExtensionDetailState, dimensions: Dimensions): ExtensionDetailState => {
  return {
    ...state,
    ...dimensions,
    ...getResponsiveLayout(dimensions.width),
  }
}
