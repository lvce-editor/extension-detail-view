import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'

export const existsFile = async (uri: string): Promise<boolean> => {
  try {
    return await FileSystemWorker.exists(uri)
  } catch {
    return false
  }
}
