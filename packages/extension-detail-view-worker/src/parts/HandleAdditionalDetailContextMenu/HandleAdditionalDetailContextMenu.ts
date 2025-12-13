import { MenuEntryId } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleAdditionalDetailContextMenu = async (
  state: ExtensionDetailState,
  x: number,
  y: number,
  nodeName: string,
  href: string,
): Promise<ExtensionDetailState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.ExtensionDetailReadme, x, y, {
    href,
    menuId: MenuEntryId.ExtensionDetailReadme,
    nodeName,
  })
  return state
}
