import { FileSystemWorker } from '@lvce-editor/rpc-registry'

export const { set, exists, readDirWithFileTypes, readFile, invoke } = FileSystemWorker

export const readFileAsBlob = async (uri: string): Promise<any> => {
  // TODO maybe readAsObjectUrl?
  // @ts-ignore
  return invoke('FileSystem.readFileAsBlob', uri)
}
