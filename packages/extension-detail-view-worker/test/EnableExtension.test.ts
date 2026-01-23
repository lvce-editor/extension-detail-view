import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import * as EnableExtension from '../src/parts/EnableExtension/EnableExtension.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('enable extension', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.enable2': () => {
      /**/
    },
  })
  await EnableExtension.enableExtension('test-id', PlatformType.Electron)
  expect(mockRpc.invocations).toEqual([['Extensions.enable2', 'test-id', PlatformType.Electron]])
})

test('handles error during enable', async () => {
  const error = new Error('Failed to enable extension')
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.enable2': async () => {
      throw error
    },
  })
  await expect(EnableExtension.enableExtension('test-id', PlatformType.Electron)).rejects.toThrow('Failed to enable extension')
  expect(mockRpc.invocations).toEqual([['Extensions.enable2', 'test-id', PlatformType.Electron]])
})
