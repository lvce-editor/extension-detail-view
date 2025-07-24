import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getRuntimeStatusDetails } from '../FeatureRuntimeStatusDetails/FeatureRuntimeStatusDetails.ts'

export const handleExtensionsStatusUpdate = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const details = await getRuntimeStatusDetails(state.extension)
  return {
    ...state,
    ...details,
  }
}
