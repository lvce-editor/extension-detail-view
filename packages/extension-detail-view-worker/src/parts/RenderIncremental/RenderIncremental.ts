import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderIncremental = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { uid } = newState
  return ['Viewlet.setPatches', uid, []]
}
