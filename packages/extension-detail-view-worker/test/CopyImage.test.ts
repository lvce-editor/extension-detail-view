import { expect, test, jest } from '@jest/globals'
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
  const mockBlob = { type: 'image/png', size: 4 }

  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeImage': () => {
      /**/
    },
  })

  const mockFileSystemInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'FileSystem.readFileAsBlob') {
      return mockBlob
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockFileSystemRpc = MockRpc.create({
    commandMap: {},
    invoke: mockFileSystemInvoke,
  })
  FileSystemWorker.set(mockFileSystemRpc)

  const iconSrc = '/test/icon.png'
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    iconSrc,
  }

  const result = await CopyImage.copyImage(state)

  expect(mockFileSystemInvoke).toHaveBeenCalledWith('FileSystem.readFileAsBlob', 'https://example.com/test/icon.png')
  expect(mockRendererRpc.invocations).toEqual([['ClipBoard.writeImage', mockBlob]])
  expect(result).toBe(state)
})
