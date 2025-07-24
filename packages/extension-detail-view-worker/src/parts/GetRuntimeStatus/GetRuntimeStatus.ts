import type { RuntimeStatus } from '../RuntimeStatus/RuntimeStatus.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const getRuntimeStatus = async (extensionId: string): Promise<RuntimeStatus> => {
  // @ts-ignore
  const status = await ExtensionHostWorker.getRuntimeStatus(extensionId)
  // @ts-ignore
  return status
}
