import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderCss = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  // TODO
  const css = ``
  return ['Viewlet.setCss', newState.uid, css]
}
