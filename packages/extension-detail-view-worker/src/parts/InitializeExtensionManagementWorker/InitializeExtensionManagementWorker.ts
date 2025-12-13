import { set } from '@lvce-editor/rpc-registry'
import { createExtensionHostWorkerRpc } from '../CreateExtensionHostWorkerRpc/CreateExtensionHostWorkerRpc.ts'

export const initializeExtensionManagementWorker = async (): Promise<void> => {
  const rpc = await createExtensionHostWorkerRpc()
  const id = 9006
  set(id, rpc)
}
