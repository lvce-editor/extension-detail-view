import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSettings } from '../src/parts/HandleClickSettings/HandleClickSettings.ts'
import * as MenuWorker from '../src/parts/MenuWorker/MenuWorker.ts'

test('handleClickSettings shows the extension management menu at the click coordinates', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'Menu.show2'() {},
    },
  })
  MenuWorker.set(mockRpc)
  const state = {
    ...createDefaultState(),
    uid: 42,
  }
  const result = await handleClickSettings(state, 100, 200)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Menu.show2', 42, MenuEntryId.ManageExtension, 100, 200, { menuId: MenuEntryId.ManageExtension }]])
})
