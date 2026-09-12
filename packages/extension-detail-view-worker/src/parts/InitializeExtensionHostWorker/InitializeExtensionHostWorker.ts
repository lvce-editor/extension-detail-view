import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { createExtensionHostWorkerRpc } from '../CreateExtensionHostWorkerRpc/CreateExtensionHostWorkerRpc.ts'

export const initializeExtensionHostWorker = async (): Promise<void> => {
  const rpc = await createExtensionHostWorkerRpc()
  ExtensionHost.set(rpc)
}
