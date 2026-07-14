import type { MenuEntryId } from '@lvce-editor/constants'

interface ContextMenuPropsBase {
  readonly menuId: number
}

interface ContextMenuPropsExplorer extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Explorer
}

interface ContextMenuPropsIcon extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ExtensionDetailIconContextMenu
}

interface ContextMenuPropsReadme extends ContextMenuPropsBase {
  readonly href: string
  readonly menuId: typeof MenuEntryId.ExtensionDetailReadme
  readonly nodeName: string
}

export type ContextMenuProps = ContextMenuPropsExplorer | ContextMenuPropsReadme | ContextMenuPropsIcon
