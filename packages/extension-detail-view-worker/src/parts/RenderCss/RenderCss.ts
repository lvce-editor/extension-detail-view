import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { createCss } from '../CreateCss/CreateCss.ts'

export const renderCss = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { paddingLeft, paddingRight, sideBarWidth, uid } = newState
  const css = createCss({
    ExtensionDetailMaxWidth: 1250,
    ExtensionDetailPaddingLeft: paddingLeft,
    ExtensionDetailPaddingRight: paddingRight,
    ExtensionDetailSideBarWidth: sideBarWidth,
  })
  return ['Viewlet.setCss', uid, css]
}
