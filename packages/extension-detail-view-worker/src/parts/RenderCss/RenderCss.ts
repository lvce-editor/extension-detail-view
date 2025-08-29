import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { createCss } from '../CreateCss/CreateCss.ts'

export const renderCss = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { uid, paddingLeft, paddingRight } = newState
  const css = createCss({
    ExtensionDetailPaddingLeft: paddingLeft,
    ExtensionDetailPaddingRight: paddingRight,
  })
  return ['Viewlet.setCss', uid, css]
}
