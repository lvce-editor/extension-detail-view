import { expect, jest, test } from '@jest/globals'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as UninstallExtension from '../src/parts/UninstallExtension/UninstallExtension.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

test('uninstall extension', async () => {
  RpcRegistry.set(1, mockRpc)
  await UninstallExtension.uninstallExtension('test-id')
  expect(mockRpc.invoke).toHaveBeenCalledWith('ExtensionManagement.uninstall', 'test-id')
})

test('handles error during uninstall', async () => {
  RpcRegistry.set(1, mockRpc)
  const error = new Error('Failed to uninstall extension')
  mockRpc.invoke.mockRejectedValue(error)
  await expect(UninstallExtension.uninstallExtension('test-id')).rejects.toThrow('Failed to uninstall extension')
})
