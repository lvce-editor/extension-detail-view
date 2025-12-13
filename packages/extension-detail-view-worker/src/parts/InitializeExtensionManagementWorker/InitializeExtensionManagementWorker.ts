import { set } from '@lvce-editor/rpc-registry'
import { createExtensionManagementWorkerRpc } from '../CreateExtensionManagementWorkerRpc/CreateExtensionManagementWorkerRpc.ts'

export const initializeExtensionManagementWorker = async (): Promise<void> => {
  const rpc = await createExtensionManagementWorkerRpc()
  const id = 9006
  set(id, rpc)
}
