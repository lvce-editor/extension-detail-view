import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createExtensionManagementWorkerRpc } from '../src/parts/CreateExtensionManagementWorkerRpc/CreateExtensionManagementWorkerRpc.ts'

test('createExtensionManagementWorkerRpc creates RPC successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {},
  })
  const rpc = await createExtensionManagementWorkerRpc()
  expect(rpc).toBeDefined()
  const {invocations} = mockRpc
  await rpc.dispose()
  expect(invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker', expect.anything(), 0],
  ])
})

test('createExtensionManagementWorkerRpc throws VError when sendMessagePortToExtensionManagementWorker fails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {
      throw new Error('fail')
    },
  })
  await expect(createExtensionManagementWorkerRpc()).rejects.toThrow('Failed to create extension management rpc')
  const {invocations} = mockRpc
  expect(invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker', expect.anything(), 0],
  ])
})

