import { test, expect } from '@jest/globals'
import { get, RpcId } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('should initialize both workers successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': () => {
      /**/
    },
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {
      /**/
    },
    sendMessagePortToExtensionHostWorker: () => {
      /**/
    },
  })
  await initialize()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', expect.any(Object), 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker', expect.any(Object), 0],
    ['sendMessagePortToExtensionHostWorker', expect.any(Object), 0],
  ])
  const fileSystemWorkerRpc = get(RpcId.FileSystemWorker)
  expect(fileSystemWorkerRpc).toBeDefined()
  await fileSystemWorkerRpc.dispose()
  const markdownWorker = get(RpcId.MarkdownWorker)
  expect(markdownWorker).toBeDefined()
  await markdownWorker.dispose()
  const extensionHostWorker = get(RpcId.ExtensionHostWorker)
  expect(extensionHostWorker).toBeDefined()
  await extensionHostWorker.dispose()
})

test('should handle initialization errors', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': () => {
      throw new Error('markdown worker failed')
    },
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {
      /**/
    },
  })

  await expect(initialize()).rejects.toThrow('Failed to create markdown worker rpc')
  expect(mockRpc.invocations).toEqual([['SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', expect.any(Object), 0]])
})
