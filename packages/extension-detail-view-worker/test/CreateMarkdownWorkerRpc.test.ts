import { jest, test, expect } from '@jest/globals'
import { VError } from '@lvce-editor/verror'
import { createMarkdownWorkerRpc } from '../src/parts/CreateMarkdownWorkerRpc/CreateMarkdownWorkerRpc.ts'

const mockRpc = {
  invoke: () => {
    throw new Error('unexpected method')
  },
}

test('createMarkdownWorkerRpc creates RPC successfully', async () => {
  // Dynamically import and mock TransferMessagePortRpcParent.create
  const rpcModule = await import('@lvce-editor/rpc')
  jest.spyOn(rpcModule.TransferMessagePortRpcParent, 'create').mockResolvedValueOnce(mockRpc as any)

  const rpc = await createMarkdownWorkerRpc()
  expect(rpc).toBe(mockRpc)
  expect(typeof rpc.invoke).toBe('function')
})

test('createMarkdownWorkerRpc throws VError when creation fails', async () => {
  const rpcModule = await import('@lvce-editor/rpc')
  jest.spyOn(rpcModule.TransferMessagePortRpcParent, 'create').mockRejectedValueOnce(new Error('Test error'))

  await expect(createMarkdownWorkerRpc()).rejects.toThrow(VError)
  await expect(createMarkdownWorkerRpc()).rejects.toThrow('Failed to create markdown worker rpc')
})