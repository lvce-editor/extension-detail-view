import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import * as DisableExtension from '../src/parts/DisableExtension/DisableExtension.ts'

test('disable extension', async () => {
  const mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disable': () => {
      /**/
    },
  })
  await DisableExtension.disableExtension('test-id')
  expect(mockRpc.invocations).toEqual([['Extensions.disable', 'test-id']])
})

test('handles error during disable', async () => {
  const error = new Error('Failed to disable extension')
  const mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disable': async () => {
      throw error
    },
  })
  await expect(DisableExtension.disableExtension('test-id')).rejects.toThrow('Failed to disable extension')
  expect(mockRpc.invocations).toEqual([['Extensions.disable', 'test-id']])
})
