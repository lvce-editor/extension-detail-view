import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import * as UninstallExtension from '../src/parts/UninstallExtension/UninstallExtension.ts'

test('uninstall extension', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.uninstall': () => {
      /**/
    },
  })
  await UninstallExtension.uninstallExtension('test-id')
  expect(mockRpc.invocations).toEqual([['Extensions.uninstall', 'test-id']])
})

test('handles error during uninstall', async () => {
  const error = new Error('Failed to uninstall extension')
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.uninstall': () => {
      throw error
    },
  })
  await expect(UninstallExtension.uninstallExtension('test-id')).rejects.toThrow('Failed to uninstall extension')
  expect(mockRpc.invocations).toEqual([['Extensions.uninstall', 'test-id']])
})
