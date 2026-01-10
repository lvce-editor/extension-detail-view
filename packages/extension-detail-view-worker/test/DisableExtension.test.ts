import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import * as DisableExtension from '../src/parts/DisableExtension/DisableExtension.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('disable extension', async () => {
  const mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disable': () => {
      /**/
    },
  })
  await DisableExtension.disableExtension('test-id', PlatformType.Electron)
  expect(mockRpc.invocations).toEqual([['Extensions.disable', 'test-id', PlatformType.Electron]])
})

test('handles error during disable', async () => {
  const error = new Error('Failed to disable extension')
  const mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disable': async () => {
      throw error
    },
  })
  await expect(DisableExtension.disableExtension('test-id', PlatformType.Electron)).rejects.toThrow('Failed to disable extension')
  expect(mockRpc.invocations).toEqual([['Extensions.disable', 'test-id', PlatformType.Electron]])
})
