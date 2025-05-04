import { expect, jest, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as UninstallExtension from '../src/parts/UninstallExtension/UninstallExtension.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

test('uninstall extension', async () => {
  ParentRpc.set(mockRpc)
  await UninstallExtension.uninstallExtension('test-id')
  expect(mockRpc.invoke).toHaveBeenCalledWith('ExtensionManagement.uninstall', 'test-id')
})

test('handles error during uninstall', async () => {
  ParentRpc.set(mockRpc)
  const error = new Error('Failed to uninstall extension')
  mockRpc.invoke.mockRejectedValue(error)
  await expect(UninstallExtension.uninstallExtension('test-id')).rejects.toThrow('Failed to uninstall extension')
})
