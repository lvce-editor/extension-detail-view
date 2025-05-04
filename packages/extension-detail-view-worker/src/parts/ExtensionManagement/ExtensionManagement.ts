import * as GetExtensionFallback from '../GetExtensionFallback/GetExtensionFallback.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

const getExtensionNew = async (id: string): Promise<any> => {
  // @ts-ignore todo
  return ParentRpc.invoke('ExtensionManagement.getExtension', id)
}

export const getExtension = async (id: string, platform: number): Promise<any> => {
  try {
    return await getExtensionNew(id)
  } catch {
    return GetExtensionFallback.getExtension(id, platform)
  }
}
