import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const handleChangelogContextMenu = async (state: ExtensionDetailState, x: number, y: number, href: string): Promise<ExtensionDetailState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ExtensionDetailChangelogContextMenu, x, y, {
    href,
    menuId: MenuEntryId.ExtensionDetailChangelogContextMenu,
  })
  return state
}
