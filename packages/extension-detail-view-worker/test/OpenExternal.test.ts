import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as OpenExternal from '../src/parts/OpenExternal/OpenExternal.ts'

test('openUrl calls RendererWorker.openUrl with the correct uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const testUri = 'https://example.com'
  await OpenExternal.openExternal(testUri, 0)

  expect(mockRpc.invocations).toEqual([['Open.openUrl', testUri]])
})

test('openExternal calls RendererWorker.openExternal on Electron', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.openExternal': () => {
      /**/
    },
  })

  const testUri = 'https://example.com'
  await OpenExternal.openExternal(testUri, PlatformType.Electron)

  expect(mockRpc.invocations).toEqual([['Open.openExternal', testUri]])
})
