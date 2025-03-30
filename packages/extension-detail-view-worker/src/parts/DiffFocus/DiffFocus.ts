import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderFocus

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return oldState === newState
}
