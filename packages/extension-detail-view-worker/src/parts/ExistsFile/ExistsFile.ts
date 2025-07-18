import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'

export const existsFile = async (uri: string): Promise<boolean> => {
  return FileSystemWorker.exists(uri)
}
