import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const diffType = DiffType.RenderScrollTop

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return newState.scrollSource === InputSource.User || oldState.readmeScrollTop === newState.readmeScrollTop
}
