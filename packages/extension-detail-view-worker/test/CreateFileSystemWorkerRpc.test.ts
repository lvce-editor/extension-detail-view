import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createFileSystemWorkerRpc } from '../src/parts/CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'

test('createFileSystemWorkerRpc creates a lazy RPC', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker': () => {},
  })
  const rpc = await createFileSystemWorkerRpc()
  expect(rpc).toBeDefined()
  expect(mockRpc.invocations).toEqual([])
  await rpc.dispose()
})
