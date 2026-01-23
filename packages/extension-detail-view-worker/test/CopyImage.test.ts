import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CopyImage from '../src/parts/CopyImage/CopyImage.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'

test('copyImage calls readFileAsBlob and writeClipBoardImage and returns state unchanged', async () => {
  const mockBlob = { size: 4, type: 'image/png' }

  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeImage': () => {},
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFileAsBlob': () => {
      return mockBlob
    },
  })

  const iconSrc = '/test/icon.png'
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    iconSrc,
    locationHost: 'example.com',
    locationProtocol: 'https:',
  }

  const result = await CopyImage.copyImage(state)

  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFileAsBlob', 'https://example.com/test/icon.png']])
  expect(mockRendererRpc.invocations).toEqual([['ClipBoard.writeImage', mockBlob]])
  expect(result).toBe(state)
})
