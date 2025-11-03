import { MenuEntryId } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleReadmeContextMenu = async (
  state: ExtensionDetailState,
  x: number,
  y: number,
  nodeName: string,
  href: string,
): Promise<ExtensionDetailState> => {
  const { uid } = state
  // TODO maybe also pass other args
  await ContextMenu.show2(uid, MenuEntryId.ExtensionDetailReadme, x, y, {
    menuId: MenuEntryId.ExtensionDetailReadme,
    nodeName,
    href,
  })
  // TODO
  return state
}
