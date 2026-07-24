import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSettings } from '../src/parts/HandleClickSettings/HandleClickSettings.ts'

test('handleClickSettings shows the extension management menu at the click coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state = {
    ...createDefaultState(),
    uid: 42,
  }
  const result = await handleClickSettings(state, 100, 200)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 42, MenuEntryId.ManageExtension, 100, 200, { menuId: MenuEntryId.ManageExtension }]])
})
