import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const hideSizeLink = (state: ExtensionDetailState): ExtensionDetailState => {
  return {
    ...state,
  }
}
