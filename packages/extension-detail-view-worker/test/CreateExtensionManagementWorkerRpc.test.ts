import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createExtensionManagementWorkerRpc } from '../src/parts/CreateExtensionManagementWorkerRpc/CreateExtensionManagementWorkerRpc.ts'

test('createExtensionManagementWorkerRpc creates a lazy RPC', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {},
  })
  const rpc = await createExtensionManagementWorkerRpc()
  expect(rpc).toBeDefined()
  expect(mockRpc.invocations).toEqual([])
  await rpc.dispose()
})
