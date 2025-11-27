import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as OpenExternal from '../src/parts/OpenExternal/OpenExternal.ts'

test('openUrl calls RendererWorker.openUrl with the correct uri', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const testUri = 'https://example.com'
  await OpenExternal.openUrl(testUri)

  expect(mockRpc.invocations).toEqual([['Open.openUrl', testUri]])
})
