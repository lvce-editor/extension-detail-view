import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { createCss } from '../CreateCss/CreateCss.ts'

export const renderCss = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { uid, paddingLeft, paddingRight, sideBarWidth } = newState
  const css = createCss({
    ExtensionDetailPaddingLeft: paddingLeft,
    ExtensionDetailPaddingRight: paddingRight,
    ExtensionDetailSideBarWidth: sideBarWidth,
    ExtensionDetailMaxWidth: 1250,
  })
  return ['Viewlet.setCss', uid, css]
}
