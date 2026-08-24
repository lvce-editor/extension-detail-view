import type { MenuEntryId as ConstantsMenuEntryId } from '@lvce-editor/constants'
import type * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

interface ContextMenuPropsBase {
  readonly menuId: number
}

interface ContextMenuPropsExplorer extends ContextMenuPropsBase {
  readonly menuId: typeof ConstantsMenuEntryId.Explorer
}

interface ContextMenuPropsIcon extends ContextMenuPropsBase {
  readonly menuId: typeof ConstantsMenuEntryId.ExtensionDetailIconContextMenu
}

interface ContextMenuPropsManageExtension extends ContextMenuPropsBase {
  readonly menuId: typeof ConstantsMenuEntryId.ManageExtension
}

interface ContextMenuPropsReadme extends ContextMenuPropsBase {
  readonly href: string
  readonly menuId: typeof ConstantsMenuEntryId.ExtensionDetailReadme
  readonly nodeName: string
}

interface ContextMenuPropsChangelog extends ContextMenuPropsBase {
  readonly href: string
  readonly menuId: typeof MenuEntryId.ExtensionDetailChangelogContextMenu
}

interface ContextMenuPropsEnableExtension extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ExtensionDetailEnableContextMenu
}

interface ContextMenuPropsDisableExtension extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ExtensionDetailDisableContextMenu
}

export type ContextMenuProps =
  | ContextMenuPropsExplorer
  | ContextMenuPropsReadme
  | ContextMenuPropsIcon
  | ContextMenuPropsManageExtension
  | ContextMenuPropsChangelog
  | ContextMenuPropsEnableExtension
  | ContextMenuPropsDisableExtension
