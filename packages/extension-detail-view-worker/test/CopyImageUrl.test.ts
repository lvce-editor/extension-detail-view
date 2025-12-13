import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CopyImageUrl from '../src/parts/CopyImageUrl/CopyImageUrl.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('copyImageUrl calls writeText with absolute URL and returns state unchanged', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {
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

  const result = await CopyImageUrl.copyImageUrl(state)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'https://example.com/test/icon.png']])
  expect(result).toBe(state)
})
