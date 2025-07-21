import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
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
  let readFileAsBlobCalled = false
  let readFileAsBlobArg: string | undefined
  let writeClipBoardImageCalled = false
  let writeClipBoardImageArg: unknown

  const mockBlob = { type: 'image/png', size: 4 }

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ClipBoard.writeImage') {
        writeClipBoardImageCalled = true
        writeClipBoardImageArg = args[0]
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockFileSystemRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'FileSystem.readFileAsBlob') {
        readFileAsBlobCalled = true
        readFileAsBlobArg = args[0]
        return mockBlob
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockFileSystemRpc)

  const iconSrc = '/test/icon.png'
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    iconSrc,
  }

  const result = await CopyImage.copyImage(state)

  expect(readFileAsBlobCalled).toBe(true)
  expect(readFileAsBlobArg).toBe('https://example.com/test/icon.png')
  expect(writeClipBoardImageCalled).toBe(true)
  expect(writeClipBoardImageArg).toBe(mockBlob)
  expect(result).toBe(state)
})
