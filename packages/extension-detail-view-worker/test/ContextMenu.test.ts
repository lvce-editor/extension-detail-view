import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('show calls showContextMenu with correct parameters', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'ContextMenu.show') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const menuId = 4091
  const x = 100
  const y = 200

  await ContextMenu.show(menuId, x, y)

  expect(mockInvoke).toHaveBeenCalledWith('ContextMenu.show', x, y, menuId)
})
