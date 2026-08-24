import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const handleClickDisableOptions = async (state: ExtensionDetailState, eventX: number, eventY: number): Promise<ExtensionDetailState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ExtensionDetailDisableContextMenu, eventX, eventY, {
    menuId: MenuEntryId.ExtensionDetailDisableContextMenu,
  })
  return state
}
