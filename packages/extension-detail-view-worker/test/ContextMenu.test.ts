import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import * as MenuWorker from '../src/parts/MenuWorker/MenuWorker.ts'

test('show2 calls invoke with correct parameters', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'Menu.show2': () => {
        /**/
      },
    },
  })
  MenuWorker.set(mockRpc)

  const uid = 123
  const menuId = 4091
  const x = 100
  const y = 200
  const args = { test: 'value' } as any

  await ContextMenu.show2(uid, menuId, x, y, args)

  expect(mockRpc.invocations).toEqual([['Menu.show2', uid, menuId, x, y, args]])
})
