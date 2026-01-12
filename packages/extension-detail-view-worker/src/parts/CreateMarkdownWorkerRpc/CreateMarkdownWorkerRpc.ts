import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as SendMessagePortToMarkdownWorker from '../SendMessagePortToMarkdownWorker/SendMessagePortToMarkdownWorker.ts'

export const createMarkdownWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await LazyTransferMessagePortRpcParent.create({
      commandMap: {},
      send: SendMessagePortToMarkdownWorker.sendMessagePortToMarkdownWorker,
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create markdown worker rpc`)
  }
}
