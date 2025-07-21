import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
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
  let writeTextCalled = false
  let writeTextArg: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ClipBoard.writeText') {
        writeTextCalled = true
        writeTextArg = args[0]
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

  const result = await CopyImageUrl.copyImageUrl(state)

  expect(writeTextCalled).toBe(true)
  expect(writeTextArg).toBe('https://example.com/test/icon.png')
  expect(result).toBe(state)
})
