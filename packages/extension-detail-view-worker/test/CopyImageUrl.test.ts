import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CopyImageUrl from '../src/parts/CopyImageUrl/CopyImageUrl.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

// Mock location for getImageCopyUrl
Object.defineProperty(globalThis, 'location', {
  value: {
    protocol: 'https:',
    host: 'example.com',
  },
  writable: true,
})

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
  }

  const result = await CopyImageUrl.copyImageUrl(state)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'https://example.com/test/icon.png']])
  expect(result).toBe(state)
})
