import { expect, test } from '@jest/globals'
import * as Clipboard from '../src/parts/Clipboard/Clipboard.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('writeClipboardImage calls writeClipBoardImage with correct blob', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeImage': () => {
      /**/
    },
  })

  const mockBlob = { type: 'image/png', size: 4 }

  await Clipboard.writeClipboardImage(mockBlob)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeImage', mockBlob]])
})

test('writeText calls writeClipBoardText with correct text', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {
      /**/
    },
  })

  const text = 'test text'

  await Clipboard.writeText(text)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', text]])
})
