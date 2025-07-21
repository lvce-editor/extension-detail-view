import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
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
  let openUrlCalled = false
  let openUrlArg: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Open.openUrl') {
        openUrlCalled = true
        openUrlArg = args[0]
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const iconSrc = '/test/icon.png'
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    iconSrc,
  }

  const result = await OpenImageInNewTab.openImageInNewTab(state)

  expect(openUrlCalled).toBe(true)
  expect(openUrlArg).toBe('https://example.com/test/icon.png')
  expect(result).toBe(state)
})
