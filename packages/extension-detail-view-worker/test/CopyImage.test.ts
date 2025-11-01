import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CopyImage from '../src/parts/CopyImage/CopyImage.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

// Mock location for getImageCopyUrl
Object.defineProperty(globalThis, 'location', {
  value: {
    protocol: 'https:',
    host: 'example.com',
  },
  writable: true,
})

test('copyImage calls readFileAsBlob and writeClipBoardImage and returns state unchanged', async () => {
  const mockBlob = { type: 'image/png', size: 4 }

  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeImage': () => {},
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFileAsBlob': () => {
      return mockBlob
    },
  })

  const iconSrc = '/test/icon.png'
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    iconSrc,
  }

  const result = await CopyImage.copyImage(state)

  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFileAsBlob', 'https://example.com/test/icon.png']])
  expect(mockRendererRpc.invocations).toEqual([['ClipBoard.writeImage', mockBlob]])
  expect(result).toBe(state)
})
