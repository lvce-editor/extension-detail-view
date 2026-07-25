import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createExtensionHostWorkerRpc } from '../src/parts/CreateExtensionHostWorkerRpc/CreateExtensionHostWorkerRpc.ts'

test('createExtensionHostWorkerRpc creates a lazy RPC', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {},
  })
  const rpc = await createExtensionHostWorkerRpc()
  expect(rpc).toBeDefined()
  expect(mockRpc.invocations).toEqual([])
  await rpc.dispose()
})
