import { VError } from '@lvce-editor/verror'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'

const supportsFileSize = (uri: string): boolean => {
  if (uri.startsWith('http:') || uri.startsWith('https://')) {
    return false
  }
  return true
}

export const getFolderSize = async (uri: string): Promise<number> => {
  if (!uri) {
    throw new VError(`uri is required`)
  }
  if (!supportsFileSize(uri)) {
    return 0
  }
  try {
    // @ts-ignore
    return await FileSystemWorker.invoke('FileSystem.getFolderSize', uri)
  } catch {
    return 0
  }
}
