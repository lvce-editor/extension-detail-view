import { FileSystemWorker } from '@lvce-editor/rpc-registry'

const logUri = 'memfs:///extension-detail-output.txt'
const maxLength = 1024 * 1024
let pending: Promise<void> = Promise.resolve()

const append = async (message: string): Promise<void> => {
  let previous = ''
  try {
    previous = await FileSystemWorker.readFile(logUri)
  } catch {
    // The channel is created when the first error arrives.
  }
  const content = `${previous}${message}\n`.slice(-maxLength)
  await FileSystemWorker.writeFile(logUri, content)
}

const appendAfter = async (previous: Promise<void>, message: string): Promise<void> => {
  try {
    await previous
    await append(message)
  } catch {
    // Logging must not prevent the detail view from displaying its error state.
  }
}

export const error = (error: Error): Promise<void> => {
  const message = `${error}\n${error.stack || ''}`
  pending = appendAfter(pending, message)
  return pending
}
