import type { FeatureState } from '../FeatureState/FeatureState.ts'
import { getRuntimeStatus } from '../GetRuntimeStatus/GetRuntimeStatus.ts'

export type FeatureRuntimeStatusState = FeatureState<'activationTime' | 'importTime' | 'status' | 'wasActivatedByEvent'>

export const getRuntimeStatusDetails = async (extension: any): Promise<FeatureRuntimeStatusState> => {
  const { activationEvent, activationTime, importTime, status } = await getRuntimeStatus(extension.id)
  return {
    activationTime,
    importTime,
    status,
    wasActivatedByEvent: activationEvent,
  }
}
