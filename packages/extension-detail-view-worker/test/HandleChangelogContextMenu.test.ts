import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleChangelogContextMenu } from '../src/parts/HandleChangelogContextMenu/HandleChangelogContextMenu.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('opens the changelog context menu with the clicked link', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => undefined,
  })
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uid: 123,
  }

  const result = await handleChangelogContextMenu(state, 10, 20, 'https://example.com')

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      123,
      MenuEntryId.ExtensionDetailChangelogContextMenu,
      10,
      20,
      {
        href: 'https://example.com',
        menuId: MenuEntryId.ExtensionDetailChangelogContextMenu,
      },
    ],
  ])
})
