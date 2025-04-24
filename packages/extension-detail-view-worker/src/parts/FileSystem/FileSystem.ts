import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const readFile = async (uri: string): Promise<string> => {
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    const response = await fetch(uri)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const result = await response.text()
    return result
  }
  return ParentRpc.invoke('FileSystem.readFile', uri)
}
