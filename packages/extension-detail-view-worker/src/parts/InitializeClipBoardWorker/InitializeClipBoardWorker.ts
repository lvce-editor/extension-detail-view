import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { ClipBoardWorker, RendererWorker } from '@lvce-editor/rpc-registry'

const createRpc = async (): Promise<Rpc> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send: async (port) => {
      await RendererWorker.sendMessagePortToClipBoardWorker(port, 0)
    },
  })
  return rpc
}

export const initializeClipBoardWorker = async (): Promise<void> => {
  const rpc = await createRpc()
  ClipBoardWorker.set(rpc)
}
