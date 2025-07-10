import { createMarkdownWorkerRpc } from '../CreateMarkdownWorkerRpc/CreateMarkdownWorkerRpc.ts'
import * as MarkdownWorker from '../MarkdownWorker/MarkdownWorker.ts'

export const initializeMarkdownWorker = async (): Promise<void> => {
  const rpc = await createMarkdownWorkerRpc()
  MarkdownWorker.set(rpc)
}
