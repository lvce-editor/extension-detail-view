import { VError } from '@lvce-editor/verror'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as IsEnoentError from '../IsEnoentError/IsEnoentError.ts'
import * as Logger from '../Logger/Logger.ts'

export const loadReadmeContent = async (readmeUri: string): Promise<string> => {
  try {
    const readmeContent = await FileSystem.readFile(readmeUri)
    return readmeContent
  } catch (error) {
    if (IsEnoentError.isEnoentError(error)) {
      return ''
    }
    await Logger.error(new VError(error, 'Failed to load Readme content'))
    return `${error}`
  }
}
