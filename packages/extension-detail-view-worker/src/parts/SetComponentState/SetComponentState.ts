import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

const applyComponentState = (currentState: ExtensionDetailState, state: ExtensionDetailState): ExtensionDetailState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Extension Detail state must be an object')
  }
  const { uid } = state
  const { uid: currentUid } = currentState
  if (uid !== currentUid) {
    throw new Error(`Extension Detail state uid must remain ${currentUid}`)
  }
  return state
}

export const setComponentState = ExtensionDetailStates.wrapCommand(applyComponentState)
