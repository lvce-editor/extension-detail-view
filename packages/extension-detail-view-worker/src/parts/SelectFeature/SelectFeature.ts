import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const selectFeature = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  return {
    ...state,
    selectedFeature: name,
  }
}
