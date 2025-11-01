import { expect, test } from '@jest/globals'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as UninstallExtension from '../src/parts/UninstallExtension/UninstallExtension.ts'

test('uninstall extension', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.uninstall': () => {
      /**/
    },
  })
  await UninstallExtension.uninstallExtension('test-id')
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.uninstall', 'test-id']])
})

test('handles error during uninstall', async () => {
  const error = new Error('Failed to uninstall extension')
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.uninstall': () => {
      throw error
    },
  })
  await expect(UninstallExtension.uninstallExtension('test-id')).rejects.toThrow('Failed to uninstall extension')
})
