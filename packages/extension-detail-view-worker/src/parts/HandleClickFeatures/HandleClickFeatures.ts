import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { selectFeature2 } from '../SelectFeature2/SelectFeature2.ts'

export const handleClickFeatures = async (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  return selectFeature2(state, name)
}
