import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const handleImageContextMenu = async (state: ExtensionDetailState, eventX: number, eventY: number): Promise<ExtensionDetailState> => {
  await ContextMenu.show(MenuEntryId.ExtensionDetailIconContextMenu, eventX, eventY)
  return state
}
