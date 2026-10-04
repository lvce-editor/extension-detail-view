import { FileSystemWorker } from '@lvce-editor/rpc-registry'

export const exists = FileSystemWorker.exists.bind(FileSystemWorker)
export const invoke = FileSystemWorker.invoke.bind(FileSystemWorker)
export const readFile = FileSystemWorker.readFile.bind(FileSystemWorker)
export const registerMockRpc = FileSystemWorker.registerMockRpc.bind(FileSystemWorker)
export const set = FileSystemWorker.set.bind(FileSystemWorker)

export const readFileAsBlob = async (uri: string): Promise<any> => {
  // TODO maybe readAsObjectUrl?
  // @ts-ignore
  return invoke('FileSystem.readFileAsBlob', uri)
}
