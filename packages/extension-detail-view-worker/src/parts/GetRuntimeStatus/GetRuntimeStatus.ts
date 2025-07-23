import type { RuntimeStatus } from '../RuntimeStatus/RuntimeStatus.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const getRuntimeStatus = async (extensionId: string): Promise<RuntimeStatus> => {
  // TODO simplify api
  // @ts-ignore
  const status = await ExtensionHostWorker.invoke('ExtensionHost.getRuntimeStatus', extensionId)
  // @ts-ignore
  return status
}
