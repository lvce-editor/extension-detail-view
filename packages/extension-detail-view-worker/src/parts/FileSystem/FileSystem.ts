import * as ParentRpc from '../ParentRpc/ParentRpc.js'

export const readFile = async (uri: string): Promise<string> => {
  return ParentRpc.invoke('FileSystem.readFile', uri)
}
