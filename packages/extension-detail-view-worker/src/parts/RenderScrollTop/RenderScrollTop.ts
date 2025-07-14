import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderScrollTop = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const selector = '.ExtensionDetailPanel .Markdown'
  const property = 'scrollTop'
  return ['Viewlet.setProperty', selector, property, newState.readmeScrollTop]
}
