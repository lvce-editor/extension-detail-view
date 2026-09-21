import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'

export const readFile = async (uri: string): Promise<string> => {
  return FileSystemWorker.readFile(uri)
}

export const readDirWithFileTypes = async (uri: string): Promise<readonly any[]> => {
  return FileSystemWorker.invoke('FileSystem.readDirWithFileTypes', uri)
}
