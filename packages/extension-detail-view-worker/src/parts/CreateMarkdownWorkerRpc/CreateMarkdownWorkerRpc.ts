import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as SendMessagePortToMarkdownWorker from '../SendMessagePortToMarkdownWorker/SendMessagePortToMarkdownWorker.ts'

export const createMarkdownWorkerRpc = async (): Promise<Rpc> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send: SendMessagePortToMarkdownWorker.sendMessagePortToMarkdownWorker,
  })
  return rpc
}
