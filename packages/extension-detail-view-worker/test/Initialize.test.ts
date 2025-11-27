import { test, expect } from '@jest/globals'
import { get, RpcId } from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('should initialize both workers successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': () => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {},
  })
  await initialize()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', expect.any(Object), 'Markdown.handleMessagePort', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker', expect.any(Object), 'FileSystem.handleMessagePort', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort2', 0],
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
  const ports: MessagePort[] = []
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': (port: MessagePort) => {
      ports.push(port)
      throw new Error('markdown worker failed')
    },
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': (port: MessagePort) => {
      ports.push(port)
    },
  })

  await expect(initialize()).rejects.toThrow('Failed to create markdown worker rpc')
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', expect.any(Object), 'Markdown.handleMessagePort', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker', expect.any(Object), 'FileSystem.handleMessagePort', 0],
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.any(Object), 'HandleMessagePort.handleMessagePort2', 0],
  ])
  for (const port of ports) {
    port.close()
  }
})
