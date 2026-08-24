import { MenuEntryId } from '@lvce-editor/constants'
import * as LocalMenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const getMenuIds = (): readonly number[] => {
  return [
    MenuEntryId.ExtensionDetailReadme,
    MenuEntryId.ExtensionDetailIconContextMenu,
    MenuEntryId.ManageExtension,
    LocalMenuEntryId.ExtensionDetailChangelogContextMenu,
    LocalMenuEntryId.ExtensionDetailEnableContextMenu,
    LocalMenuEntryId.ExtensionDetailDisableContextMenu,
  ]
}
