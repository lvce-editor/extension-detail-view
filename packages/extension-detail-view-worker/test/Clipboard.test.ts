import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as Clipboard from '../src/parts/Clipboard/Clipboard.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('writeClipboardImage calls writeClipBoardImage with correct blob', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'ClipBoard.writeImage') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const mockBlob = { type: 'image/png', size: 4 }

  await Clipboard.writeClipboardImage(mockBlob)

  expect(mockInvoke).toHaveBeenCalledWith('ClipBoard.writeImage', mockBlob)
})

test('writeText calls writeClipBoardText with correct text', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'ClipBoard.writeText') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const text = 'test text'

  await Clipboard.writeText(text)

  expect(mockInvoke).toHaveBeenCalledWith('ClipBoard.writeText', text)
})
