import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return oldState.focus === newState.focus && oldState.focusedTabIndex === newState.focusedTabIndex
}
