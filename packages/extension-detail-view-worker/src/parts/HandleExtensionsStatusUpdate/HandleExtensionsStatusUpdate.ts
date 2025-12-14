import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as FeatureRuntimeStatusDetails from '../FeatureRuntimeStatusDetails/FeatureRuntimeStatusDetails.ts'

export const handleExtensionsStatusUpdate = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension } = state
  const details = await FeatureRuntimeStatusDetails.getRuntimeStatusDetails(extension)
  return {
    ...state,
    ...details,
  }
}
