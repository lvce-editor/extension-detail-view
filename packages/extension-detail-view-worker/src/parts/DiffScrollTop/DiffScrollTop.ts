import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return (
    newState.scrollSource === InputSource.User ||
    (oldState.readmeScrollTop === newState.readmeScrollTop && oldState.selectedTab === newState.selectedTab)
  )
}
