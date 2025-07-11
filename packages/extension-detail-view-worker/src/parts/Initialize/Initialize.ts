import { initializeMarkdownWorker } from '../InitializeMarkdownWorker/InitializeMarkdownWorker.ts'

export const initialize = async (): Promise<void> => {
  await initializeMarkdownWorker()
  // TODO create connection to file system worker
}
