import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OpenImageInNewTab from '../src/parts/OpenImageInNewTab/OpenImageInNewTab.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

// Mock location for getImageCopyUrl
Object.defineProperty(globalThis, 'location', {
  value: {
    protocol: 'https:',
    host: 'example.com',
  },
  writable: true,
})

test('openImageInNewTab calls openUrl with absolute icon url and returns state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const iconSrc = '/test/icon.png'
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    iconSrc,
  }

  const result = await OpenImageInNewTab.openImageInNewTab(state)

  expect(mockRpc.invocations).toEqual([['Open.openUrl', 'https://example.com/test/icon.png']])
  expect(result).toBe(state)
})
