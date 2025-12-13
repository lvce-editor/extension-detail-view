import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleExtensionsChanged = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  // TODO query extension again
  return {
    ...state,
  }
}
