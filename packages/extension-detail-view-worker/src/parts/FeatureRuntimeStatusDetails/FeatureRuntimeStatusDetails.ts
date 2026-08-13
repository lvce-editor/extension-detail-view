import type { FeatureState } from '../FeatureState/FeatureState.ts'
import { getRuntimeStatus } from '../GetRuntimeStatus/GetRuntimeStatus.ts'

export type FeatureRuntimeStatusState = FeatureState<'activationTime' | 'importTime' | 'memoryUsage' | 'status' | 'wasActivatedByEvent'>

export const getRuntimeStatusDetails = async (extension: any): Promise<FeatureRuntimeStatusState> => {
  const { activationEvent, activationTime, importTime, memoryUsage = 0, status } = await getRuntimeStatus(extension.id)
  return {
    activationTime,
    importTime,
    memoryUsage,
    status,
    wasActivatedByEvent: activationEvent,
  }
}
