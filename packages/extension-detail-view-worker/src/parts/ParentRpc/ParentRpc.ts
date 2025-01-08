import * as RpcId from '../RpcId/RpcId.ts'
import * as RpRegistry from '../RpRegistry/RpRegistry.ts'

export const invoke = (method: string, ...params: any[]): Promise<any> => {
  const rpc = RpRegistry.get(RpcId.RendererWorker)
  return rpc.invoke(method, ...params)
}
