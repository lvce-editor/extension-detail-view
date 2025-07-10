import { VError } from '@lvce-editor/verror'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as IsEnoentError from '../IsEnoentError/IsEnoentError.ts'
import * as Path from '../Path/Path.ts'

export const loadChangelogContent = async (path: string): Promise<string> => {
  try {
    const changelogUrl = Path.join('/', path, 'CHANGELOG.md')
    const changelogContent = await FileSystem.readFile(changelogUrl)
    return changelogContent
  } catch (error) {
    if (IsEnoentError.isEnoentError(error)) {
      return ''
    }
    // TODO send message to error worker
    // @ts-ignore
    console.error(new VError(error, 'Failed to load Changelog content'))
    return `${error}`
  }
}
