import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getRuntimeStatus } from '../GetRuntimeStatus/GetRuntimeStatus.ts'

export const getRuntimeStatusDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const { activationEvent, status } = await getRuntimeStatus(extension.id)
  return {
    wasActivatedByEvent: activationEvent,
    status,
  }
}
