import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { registerCommands } from '../ExtensionDetailStates/ExtensionDetailStates.ts'
import { initializeClipBoardWorker } from '../InitializeClipBoardWorker/InitializeClipBoardWorker.ts'
import { initializeExtensionHostWorker } from '../InitializeExtensionHostWorker/InitializeExtensionHostWorker.ts'
import { initializeExtensionManagementWorker } from '../InitializeExtensionManagementWorker/InitializeExtensionManagementWorker.ts'
import { initializeFileSystemWorker } from '../InitializeFileSystemWorker/InitializeFileSystemWorker.ts'
import { initializeMarkdownWorker } from '../InitializeMarkdownWorker/InitializeMarkdownWorker.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
  await Promise.all([
    initializeMarkdownWorker(),
    initializeFileSystemWorker(),
    initializeExtensionHostWorker(),
    initializeExtensionManagementWorker(),
    initializeClipBoardWorker(),
  ])
}
