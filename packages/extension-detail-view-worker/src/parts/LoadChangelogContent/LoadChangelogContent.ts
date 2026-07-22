import { VError } from '@lvce-editor/verror'
import * as ChangelogCache from '../ChangelogCache/ChangelogCache.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as IsEnoentError from '../IsEnoentError/IsEnoentError.ts'
import * as Logger from '../Logger/Logger.ts'
import * as Path from '../Path/Path.ts'

interface IChangelogCache {
  readonly get: (uri: string) => Promise<string | undefined>
  readonly set: (uri: string, value: string) => Promise<void>
}

export const loadChangelogContent = async (path: string, cache: IChangelogCache = ChangelogCache): Promise<string> => {
  try {
    const changelogUrl = Path.join(path, 'CHANGELOG.md')
    const cachedContent = await cache.get(changelogUrl)
    if (cachedContent !== undefined) {
      return cachedContent
    }
    const changelogContent = await FileSystem.readFile(changelogUrl)
    await cache.set(changelogUrl, changelogContent)
    return changelogContent
  } catch (error) {
    if (IsEnoentError.isEnoentError(error)) {
      return ''
    }
    await Logger.error(new VError(error, 'Failed to load Changelog content'))
    return `${error}`
  }
}
