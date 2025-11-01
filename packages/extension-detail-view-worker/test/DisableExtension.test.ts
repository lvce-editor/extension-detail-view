import { expect, test } from '@jest/globals'
import * as DisableExtension from '../src/parts/DisableExtension/DisableExtension.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('disable extension', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      /**/
    },
  })
  await DisableExtension.disableExtension('test-id')
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.disable', 'test-id']])
})

test('handles error during disable', async () => {
  const error = new Error('Failed to disable extension')
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      throw error
    },
  })
  await expect(DisableExtension.disableExtension('test-id')).rejects.toThrow('Failed to disable extension')
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.disable', 'test-id']])
})
