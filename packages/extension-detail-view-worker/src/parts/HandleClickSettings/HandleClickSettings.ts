import { MenuEntryId } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleClickSettings = async (state: ExtensionDetailState, eventX: number, eventY: number): Promise<ExtensionDetailState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ManageExtension, eventX, eventY, {
    menuId: MenuEntryId.ManageExtension,
  })
  return state
}
