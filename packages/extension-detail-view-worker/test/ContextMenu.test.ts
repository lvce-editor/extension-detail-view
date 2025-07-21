import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('show calls showContextMenu with correct parameters', async () => {
  let showContextMenuCalled = false
  let showContextMenuArgs: readonly any[] = []

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ContextMenu.show') {
        showContextMenuCalled = true
        showContextMenuArgs = args
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const menuId = 4091
  const x = 100
  const y = 200

  await ContextMenu.show(menuId, x, y)

  expect(showContextMenuCalled).toBe(true)
  expect(showContextMenuArgs).toEqual([x, y, menuId])
})
