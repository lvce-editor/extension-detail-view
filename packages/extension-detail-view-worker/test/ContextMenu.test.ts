import { expect, test } from '@jest/globals'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('show2 calls invoke with correct parameters', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {
      /**/
    },
  })

  const uid = 123
  const menuId = 4091
  const x = 100
  const y = 200
  const args = { test: 'value' }

  await ContextMenu.show2(uid, menuId, x, y, args)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', uid, menuId, x, y, args]])
})
