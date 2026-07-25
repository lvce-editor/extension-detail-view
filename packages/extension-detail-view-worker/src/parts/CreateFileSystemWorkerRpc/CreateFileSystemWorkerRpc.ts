import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as SendMessagePortToFileSystemWorker from '../SendMessagePortToFileSystemWorker/SendMessagePortToFileSystemWorker.ts'

export const createFileSystemWorkerRpc = async (): Promise<Rpc> => {
  return LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send: SendMessagePortToFileSystemWorker.sendMessagePortToFileSystemWorker,
  })
}
