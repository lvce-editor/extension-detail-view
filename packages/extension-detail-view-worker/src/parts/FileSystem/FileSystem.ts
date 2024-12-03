import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const readFile = async (uri: string): Promise<string> => {
  return ParentRpc.invoke('FileSystem.readFile', uri)
}
