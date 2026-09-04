import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const getComponentState = (uid: number): ExtensionDetailState => {
  return ExtensionDetailStates.get(uid).newState
}
