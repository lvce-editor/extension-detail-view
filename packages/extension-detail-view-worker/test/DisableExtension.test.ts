import { expect, jest, test } from '@jest/globals'
import * as DisableExtension from '../src/parts/DisableExtension/DisableExtension.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

test('disable extension', async () => {
  RpcRegistry.set(1, mockRpc)
  await DisableExtension.disableExtension('test-id')
  expect(mockRpc.invoke).toHaveBeenCalledWith('ExtensionManagement.disable', 'test-id')
})

test('handles error during disable', async () => {
  RpcRegistry.set(1, mockRpc)
  const error = new Error('Failed to disable extension')
  mockRpc.invoke.mockRejectedValue(error)
  await expect(DisableExtension.disableExtension('test-id')).rejects.toThrow('Failed to disable extension')
})
