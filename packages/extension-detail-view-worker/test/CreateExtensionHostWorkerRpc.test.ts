import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createExtensionHostWorkerRpc } from '../src/parts/CreateExtensionHostWorkerRpc/CreateExtensionHostWorkerRpc.ts'

test('createExtensionHostWorkerRpc creates RPC successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {},
  })
  const rpc = await createExtensionHostWorkerRpc()
  expect(rpc).toBeDefined()
  await rpc.dispose()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.anything(), 'HandleMessagePort.handleMessagePort2', 0],
  ])
})

test('createExtensionHostWorkerRpc throws VError when sendMessagePortToExtensionHostWorker fails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker': () => {
      throw new Error('fail')
    },
  })
  await expect(createExtensionHostWorkerRpc()).rejects.toThrow('Failed to create extension host rpc')
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker', expect.anything(), 'HandleMessagePort.handleMessagePort2', 0],
  ])
})
