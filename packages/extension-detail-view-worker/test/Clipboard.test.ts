import { expect, test } from '@jest/globals'
import { ClipBoardWorker } from '@lvce-editor/rpc-registry'
import * as Clipboard from '../src/parts/Clipboard/Clipboard.ts'

test('writeClipboardImage calls writeClipBoardImage with correct blob', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({
    'ClipBoard.writeImage': () => {
      /**/
    },
  })

  const mockBlob = { size: 4, type: 'image/png' }

  await Clipboard.writeClipboardImage(mockBlob)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeImage', mockBlob]])
})

test('writeText calls writeClipBoardText with correct text', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({
    'ClipBoard.writeText': () => {
      /**/
    },
  })

  const text = 'test text'

  await Clipboard.writeText(text)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', text]])
})
