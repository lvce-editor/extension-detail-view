import { VError } from '@lvce-editor/verror'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as IsEnoentError from '../IsEnoentError/IsEnoentError.ts'
import * as Path from '../Path/Path.ts'

export const loadReadmeContent = async (path: string): Promise<string> => {
  try {
    const readmeUrl = Path.join('/', path, 'README.md')
    const readmeContent = await FileSystem.readFile(readmeUrl)
    return readmeContent
  } catch (error) {
    if (IsEnoentError.isEnoentError(error)) {
      return ''
    }
    console.error(new VError(error, 'Failed to load Readme content'))
    return `${error}`
  }
}
