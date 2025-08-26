import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return oldState.width === newState.width
}
