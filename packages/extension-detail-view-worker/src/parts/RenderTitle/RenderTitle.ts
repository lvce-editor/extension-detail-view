import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderTitle = (state: ExtensionDetailState): string => {
  return state.name
}
