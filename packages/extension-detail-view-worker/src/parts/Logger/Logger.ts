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

export const error = (error: Error): Promise<void> => {
  const message = error.stack || String(error)
  pending = pending
    .then(() => append(message))
    .catch(() => {
      // Logging must not prevent the detail view from displaying its error state.
    })
  return pending
}
