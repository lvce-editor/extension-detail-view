import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderScrollTop = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  return ['Viewlet.setScrollTop', '', newState.readmeScrollTop]
}
