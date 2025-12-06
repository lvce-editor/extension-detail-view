import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getRuntimeStatus } from '../GetRuntimeStatus/GetRuntimeStatus.ts'

export const getRuntimeStatusDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const { activationEvent, activationTime, importTime, status } = await getRuntimeStatus(extension.id)
  return {
    activationTime,
    importTime,
    status,
    wasActivatedByEvent: activationEvent,
  }
}
