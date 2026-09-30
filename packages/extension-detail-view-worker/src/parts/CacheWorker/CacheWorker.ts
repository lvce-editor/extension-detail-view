import type { Rpc } from '@lvce-editor/rpc'

let rpc: Rpc | undefined

export const set = (cacheWorkerRpc: Rpc): void => {
  rpc = cacheWorkerRpc
}

export const invoke = (command: string, ...args: any[]): Promise<any> => {
  if (!rpc) {
    throw new Error('Cache worker RPC is not initialized')
  }
  return rpc.invoke(command, ...args)
}
