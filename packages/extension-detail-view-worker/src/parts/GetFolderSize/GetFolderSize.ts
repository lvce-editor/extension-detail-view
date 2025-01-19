import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const getFolderSize = (uri: string): Promise<number> => {
  return ParentRpc.invoke('FileSystem.getFolderSize', uri)
}
