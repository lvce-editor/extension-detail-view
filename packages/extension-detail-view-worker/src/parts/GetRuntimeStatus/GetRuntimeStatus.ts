import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { RuntimeStatus } from '../RuntimeStatus/RuntimeStatus.ts'

export const getRuntimeStatus = async (extensionId: string): Promise<RuntimeStatus> => {
  return ExtensionManagementWorker.invoke('Extensions.getRuntimeStatus', extensionId)
}
