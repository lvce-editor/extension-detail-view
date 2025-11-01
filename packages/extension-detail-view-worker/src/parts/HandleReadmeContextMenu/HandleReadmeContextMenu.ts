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
  await ContextMenu.show(MenuEntryId.ExtensionDetailReadme, x, y)
  // TODO
  return state
}
