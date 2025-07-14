import { VError } from '@lvce-editor/verror'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as IsEnoentError from '../IsEnoentError/IsEnoentError.ts'

export const loadReadmeContent = async (readmeUrl: string): Promise<string> => {
  try {
    const readmeContent = await FileSystem.readFile(readmeUrl)
    return readmeContent
  } catch (error) {
    if (IsEnoentError.isEnoentError(error)) {
      return ''
    }
    // TODO send message to error worker
    // @ts-ignore
    console.error(new VError(error, 'Failed to load Readme content'))
    return `${error}`
  }
}
