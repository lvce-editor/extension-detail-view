import { expect, test } from '@jest/globals'
import * as EnableExtension from '../src/parts/EnableExtension/EnableExtension.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('enable extension', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      /**/
    },
  })
  await EnableExtension.enableExtension('test-id')
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.enable', 'test-id']])
})

test('handles error during enable', async () => {
  const error = new Error('Failed to enable extension')
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      throw error
    },
  })
  await expect(EnableExtension.enableExtension('test-id')).rejects.toThrow('Failed to enable extension')
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.enable', 'test-id']])
})
