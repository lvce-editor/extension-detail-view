import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { MenuProps } from '../MenuProps/MenuProps.ts'
import * as GetCopyMenuEntry from '../GetCopyMenuEntry/GetCopyMenuEntry.ts'
import * as GetImageMenuEntries from '../GetImageMenuEntries/GetImageMenuEntries.ts'
import * as GetLinkMenuEntries from '../GetLinkMenuEntries/GetLinkMenuEntries.ts'

export const getMenuEntries = (props: MenuProps): readonly MenuEntry[] => [
  ...GetLinkMenuEntries.getLinkMenuEntries(props),
  ...GetImageMenuEntries.getImageMenuEntries(props),
  GetCopyMenuEntry.getCopyMenuEntry(),
]
