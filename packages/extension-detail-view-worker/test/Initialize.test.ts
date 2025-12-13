import { test, expect } from '@jest/globals'
import { get, RpcId } from '@lvce-editor/rpc-registry'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('should initialize both workers successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': () => {},
  })
  await initialize()
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(3)
  expect(mockRpc.invocations).toContainEqual([
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker',
    expect.any(Object),
    'Markdown.handleMessagePort',
    0,
  ])
  expect(mockRpc.invocations).toContainEqual([
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker',
    expect.any(Object),
    'FileSystem.handleMessagePort',
    0,
  ])
  expect(mockRpc.invocations).toContainEqual([
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    expect.any(Object),
    'HandleMessagePort.handleMessagePort2',
    0,
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
  const extensionManagementWorker = get(RpcId.ExtensionManagementWorker)
  if (extensionManagementWorker) {
    await extensionManagementWorker.dispose()
  }
})

test('should handle initialization errors', async () => {
  const ports: MessagePort[] = []
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {},
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': (port: MessagePort) => {
      ports.push(port)
    },
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': (port: MessagePort) => {
      ports.push(port)
      throw new Error('markdown worker failed')
    },
  })

  await expect(initialize()).rejects.toThrow('Failed to create markdown worker rpc')
  expect(mockRpc.invocations.length).toBeGreaterThanOrEqual(1)
  expect(mockRpc.invocations).toContainEqual([
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker',
    expect.any(Object),
    'Markdown.handleMessagePort',
    0,
  ])
  for (const port of ports) {
    port.close()
  }
})
