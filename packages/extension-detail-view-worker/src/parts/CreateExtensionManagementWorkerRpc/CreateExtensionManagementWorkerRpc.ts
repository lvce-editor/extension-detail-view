import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import * as SendMessagePortToExtensionHostWorker from '../SendMessagePortToExtensionHostWorker/SendMessagePortToExtensionHostWorker.ts'

export const createExtensionManagementWorkerRpc = async (): Promise<Rpc> => {
  try {
    const rpc = await TransferMessagePortRpcParent.create({
      commandMap: {},
      // @ts-ignore
      send: SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker,
    })
    return rpc
  } catch (error) {
    throw new VError(error, `Failed to create extension management rpc`)
  }
}
