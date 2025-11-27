import { expect, test } from '@jest/globals'
import { createFileSystemWorkerRpc } from '../src/parts/CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('createFileSystemWorkerRpc creates RPC successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {},
  })
  const rpc = await createFileSystemWorkerRpc()
  expect(rpc).toBeDefined()
  await rpc.dispose()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker', expect.anything(), 'FileSystem.handleMessagePort', 0],
  ])
})

test('createFileSystemWorkerRpc throws VError when sendMessagePortToFileSystemWorker fails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {
      throw new Error('fail')
    },
  })
  await expect(createFileSystemWorkerRpc()).rejects.toThrow('Failed to create file system worker rpc')
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker', expect.anything(), 'FileSystem.handleMessagePort', 0],
  ])
})
