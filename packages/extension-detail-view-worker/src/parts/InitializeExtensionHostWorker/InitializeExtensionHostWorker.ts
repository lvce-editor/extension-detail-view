import { createExtensionHostWorkerRpc } from '../CreateExtensionHostWorkerRpc/CreateExtensionHostWorkerRpc.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const initializeExtensionHostWorker = async (): Promise<void> => {
  const rpc = await createExtensionHostWorkerRpc()
  ExtensionHostWorker.set(rpc)
}
