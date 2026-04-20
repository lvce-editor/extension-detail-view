import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetScrollTop from '../GetScrollTop/GetScrollTop.ts'

export const renderScrollTop = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const selector = '.ExtensionDetailPanel .Markdown'
  const property = 'scrollTop'
  const { changelogScrollTop, readmeScrollTop, selectedTab, uid } = newState
  const scrollTop = GetScrollTop.getScrollTop(selectedTab, readmeScrollTop, changelogScrollTop)
  if (scrollTop === -1) {
    return []
  }
  return ['Viewlet.setProperty', uid, selector, property, scrollTop]
}
