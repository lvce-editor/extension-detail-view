import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

const applyComponentState = (currentState: ExtensionDetailState, state: ExtensionDetailState): ExtensionDetailState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Extension Detail state must be an object')
  }
  if (state.uid !== currentState.uid) {
    throw new Error(`Extension Detail state uid must remain ${currentState.uid}`)
  }
  return state
}

export const setComponentState = ExtensionDetailStates.wrapCommand(applyComponentState)
