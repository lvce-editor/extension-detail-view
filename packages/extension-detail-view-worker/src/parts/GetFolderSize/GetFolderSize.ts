import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const getFolderSize = async (uri: string): Promise<number> => {
  try {
    return await ParentRpc.invoke('FileSystem.getFolderSize', uri)
  } catch {
    return 0
  }
}
