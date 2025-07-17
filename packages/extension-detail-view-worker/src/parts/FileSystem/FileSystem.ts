import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'

export const readFile = async (uri: string): Promise<string> => {
  return FileSystemWorker.readFile(uri)
}
