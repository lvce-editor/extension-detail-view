import { MenuEntryId } from '@lvce-editor/constants'

const ExtensionDetailIconContextMenu = 4091

export const getMenuIds = (): readonly number[] => {
  return [MenuEntryId.ExtensionDetailReadme, ExtensionDetailIconContextMenu]
}
