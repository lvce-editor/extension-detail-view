import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as SelectFeature from '../SelectFeature/SelectFeature.ts'

export const handleClickFeatures = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  return SelectFeature.selectFeature(state, name)
}
