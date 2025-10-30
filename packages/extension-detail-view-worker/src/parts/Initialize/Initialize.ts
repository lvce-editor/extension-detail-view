import { initializeExtensionHostWorker } from '../InitializeExtensionHostWorker/InitializeExtensionHostWorker.ts'
import { initializeFileSystemWorker } from '../InitializeFileSystemWorker/InitializeFileSystemWorker.ts'
import { initializeMarkdownWorker } from '../InitializeMarkdownWorker/InitializeMarkdownWorker.ts'

export const initialize = async (): Promise<void> => {
  // TODO load markdown worker only when needed
  await Promise.all([initializeMarkdownWorker(), initializeFileSystemWorker(), initializeExtensionHostWorker()])
}
