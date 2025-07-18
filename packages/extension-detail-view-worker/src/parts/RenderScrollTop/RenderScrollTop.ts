import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

const getScrollTop = (selectedTab: string, readmeScrollTop: number, changelogScrollTop: number): number => {
  if (selectedTab === InputName.Details) {
    return readmeScrollTop
  }
  if (selectedTab === InputName.Changelog) {
    return changelogScrollTop
  }
  return -1
}

export const renderScrollTop = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const selector = '.ExtensionDetailPanel .Markdown'
  const property = 'scrollTop'
  const { uid, readmeScrollTop, changelogScrollTop, selectedTab } = newState
  const scrollTop = getScrollTop(selectedTab, readmeScrollTop, changelogScrollTop)
  if (scrollTop === -1) {
    return []
  }
  return ['Viewlet.setProperty', uid, selector, property, scrollTop]
}
