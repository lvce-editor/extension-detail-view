import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as SendMessagePortToExtensionHostWorker from '../SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.ts'

export const createExtensionHostWorkerRpc = async (): Promise<Rpc> => {
  return LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send: SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker,
  })
}
