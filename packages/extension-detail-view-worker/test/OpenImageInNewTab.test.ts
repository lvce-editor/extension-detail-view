import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OpenImageInNewTab from '../src/parts/OpenImageInNewTab/OpenImageInNewTab.ts'

test('openImageInNewTab calls openUrl with absolute icon url and returns state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const iconSrc = '/test/icon.png'
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    iconSrc,
    locationHost: 'example.com',
    locationProtocol: 'https:',
  }

  const result = await OpenImageInNewTab.openImageInNewTab(state)

  expect(mockRpc.invocations).toEqual([['Open.openUrl', 'https://example.com/test/icon.png']])
  expect(result).toBe(state)
})
