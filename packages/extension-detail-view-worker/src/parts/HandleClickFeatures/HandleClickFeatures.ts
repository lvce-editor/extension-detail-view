import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { selectFeature } from '../SelectFeature/SelectFeature.ts'

export const handleClickFeatures = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  return selectFeature(state, name)
}
