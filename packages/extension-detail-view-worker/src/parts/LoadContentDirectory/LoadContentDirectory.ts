import { DirentType } from '@lvce-editor/constants'
import type { ContentEntry } from '../ContentEntry/ContentEntry.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as Path from '../Path/Path.ts'

const compareEntries = (a: ContentEntry, b: ContentEntry): number => {
  const aDirectory = a.type === DirentType.Directory
  const bDirectory = b.type === DirentType.Directory
  if (aDirectory !== bDirectory) {
    return aDirectory ? -1 : 1
  }
  return a.name.localeCompare(b.name)
}

export const loadContentDirectory = async (uri: string, depth: number): Promise<readonly ContentEntry[]> => {
  const dirents = await FileSystem.readDirWithFileTypes(uri)
  return dirents
    .filter((dirent) => typeof dirent?.name === 'string' && typeof dirent?.type === 'number')
    .map((dirent) => ({
      depth,
      name: dirent.name,
      type: dirent.type,
      uri: Path.join(uri, dirent.name),
    }))
    .toSorted(compareEntries)
}
