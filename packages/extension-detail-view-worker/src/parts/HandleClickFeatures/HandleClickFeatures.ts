import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleClickFeatures = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  return {
    ...state,
    selectedFeature: name,
  }
}
