import * as GetLinkMenuEntries from '../GetLinkMenuEntries/GetLinkMenuEntries.ts'
import * as GetImageMenuEntries from '../GetImageMenuEntries/GetImageMenuEntries.ts'
import * as GetCopyMenuEntry from '../GetCopyMenuEntry/GetCopyMenuEntry.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

interface MenuProps {
  isLink?: boolean
  isImage?: boolean
  url?: string
}

export const getMenuEntries = (props: MenuProps): MenuEntry[] => [
  ...(props.isLink ? GetLinkMenuEntries.getLinkMenuEntries(props.url || '') : []),
  ...(props.isImage ? GetImageMenuEntries.getImageMenuEntries(props.url || '') : []),
  GetCopyMenuEntry.getCopyMenuEntry(),
]
