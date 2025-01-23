import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

const states = Object.create(null)

export const get = (
  uid: number,
): {
  oldState: ExtensionDetailState
  newState: ExtensionDetailState
} => {
  return states[uid]
}

export const set = (uid: number, oldState: ExtensionDetailState, newState: ExtensionDetailState): void => {
  states[uid] = {
    oldState,
    newState,
  }
}
