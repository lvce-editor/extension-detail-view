/* eslint-disable jest/no-restricted-jest-methods -- This test verifies the lazy RPC adapter and renderer-worker port transfer. */
import { expect, jest, test } from '@jest/globals'

const mockLazyTransferMessagePortRpcParent = {
  create: jest.fn(),
}
const mockRendererWorker = {
  invokeAndTransfer: jest.fn(),
}

jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  LazyTransferMessagePortRpcParent: mockLazyTransferMessagePortRpcParent,
}))
jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  RendererWorker: mockRendererWorker,
}))

const { createCacheWorkerRpc } = await import('../src/parts/CreateCacheWorkerRpc/CreateCacheWorkerRpc.ts')

test('creates a lazy rpc that transfers its port to cache-worker on first use', async () => {
  const rpc = { invoke: jest.fn() }
  mockLazyTransferMessagePortRpcParent.create.mockResolvedValue(rpc as never)
  const result = await createCacheWorkerRpc()
  expect(result).toBe(rpc)
  expect(mockRendererWorker.invokeAndTransfer).not.toHaveBeenCalled()
  const [{ commandMap, send }] = mockLazyTransferMessagePortRpcParent.create.mock.calls[0] as any
  expect(commandMap).toEqual({})
  const port = {} as MessagePort
  await send(port)
  expect(mockRendererWorker.invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToExtensionHostWorker.sendMessagePortToCacheWorker', port)
})
