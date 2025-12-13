import type { MenuEntryId } from '@lvce-editor/constants'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsExplorer extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Explorer
}

export interface ContextMenuPropsReadme extends ContextMenuPropsBase {
  readonly href: string
  readonly menuId: typeof MenuEntryId.ExtensionDetailReadme
  readonly nodeName: string
}

export type ContextMenuProps = ContextMenuPropsExplorer | ContextMenuPropsReadme
