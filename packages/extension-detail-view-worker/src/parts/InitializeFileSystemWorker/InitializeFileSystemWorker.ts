import { createFileSystemWorkerRpc } from '../CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'
import * as MarkdownWorker from '../MarkdownWorker/MarkdownWorker.ts'

export const initializeFileSystemWorker = async (): Promise<void> => {
  const rpc = await createFileSystemWorkerRpc()
  MarkdownWorker.set(rpc)
}
