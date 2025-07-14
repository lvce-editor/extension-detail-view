import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return newState.scrollSource === InputSource.Script || oldState.readmeScrollTop === newState.readmeScrollTop
}
