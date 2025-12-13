import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createExtensionManagementWorkerRpc } from '../src/parts/CreateExtensionManagementWorkerRpc/CreateExtensionManagementWorkerRpc.ts'

test('createExtensionManagementWorkerRpc creates RPC successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {},
  })
  const rpc = await createExtensionManagementWorkerRpc()
  expect(rpc).toBeDefined()
  await rpc.dispose()
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
  expect(mockRpc.invocations[0][0]).toBe('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker')
})

test('createExtensionManagementWorkerRpc throws VError when sendMessagePortToExtensionManagementWorker fails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker': () => {
      throw new Error('fail')
    },
  })
  await expect(createExtensionManagementWorkerRpc()).rejects.toThrow('Failed to create extension management rpc')
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
  expect(mockRpc.invocations[0][0]).toBe('SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker')
})

