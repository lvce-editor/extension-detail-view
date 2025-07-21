import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as Clipboard from '../src/parts/Clipboard/Clipboard.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('writeClipboardImage calls writeClipBoardImage with correct blob', async () => {
  let writeClipBoardImageCalled = false
  let writeClipBoardImageArg: unknown

  const mockRpc = MockRpc.create({
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
  RendererWorker.set(mockRpc)

  const mockBlob = { type: 'image/png', size: 4 }

  await Clipboard.writeClipboardImage(mockBlob)

  expect(writeClipBoardImageCalled).toBe(true)
  expect(writeClipBoardImageArg).toBe(mockBlob)
})

test('writeText calls writeClipBoardText with correct text', async () => {
  let writeClipBoardTextCalled = false
  let writeClipBoardTextArg: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ClipBoard.writeText') {
        writeClipBoardTextCalled = true
        writeClipBoardTextArg = args[0]
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const text = 'test text'

  await Clipboard.writeText(text)

  expect(writeClipBoardTextCalled).toBe(true)
  expect(writeClipBoardTextArg).toBe(text)
})
