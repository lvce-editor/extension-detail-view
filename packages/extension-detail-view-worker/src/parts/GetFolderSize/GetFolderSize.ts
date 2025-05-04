import { VError } from '@lvce-editor/verror'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const getFolderSize = async (uri: string): Promise<number> => {
  if (!uri) {
    throw new VError(`uri is required`)
  }
  try {
    // @ts-ignore todo
    return await ParentRpc.invoke('FileSystem.getFolderSize', uri)
  } catch {
    return 0
  }
}
