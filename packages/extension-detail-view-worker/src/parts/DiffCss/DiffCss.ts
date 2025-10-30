import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return (
    oldState.paddingLeft === newState.paddingLeft &&
    oldState.paddingRight === newState.paddingRight &&
    oldState.sideBarWidth === newState.sideBarWidth
  )
}
