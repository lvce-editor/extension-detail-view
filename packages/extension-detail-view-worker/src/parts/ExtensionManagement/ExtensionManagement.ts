import { get, RendererWorker, RpcId } from '@lvce-editor/rpc-registry'
import * as GetExtensionFallback from '../GetExtensionFallback/GetExtensionFallback.ts'

const getExtensionNew = async (id: string): Promise<any> => {
  try {
    const rpc = get(RpcId.ExtensionManagementWorker)
    return await rpc.invoke('Extensions.getExtension', id)
  } catch {
    // ignore
  }
  return RendererWorker.getExtension(id)
}

export const getExtension = async (id: string, platform: number): Promise<any> => {
  try {
    return await getExtensionNew(id)
  } catch {
    return GetExtensionFallback.getExtension(id, platform)
  }
}
