import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { MenuProps } from '../MenuProps/MenuProps.ts'

export const getLinkMenuEntries = (props: MenuProps): readonly MenuEntry[] => {
  if (!props.isLink) {
    return []
  }
  return [
    {
      id: 'openInNewTab',
      label: ViewletExtensionDetailStrings.openInNewTab(),
      flags: MenuItemFlags.None,
      command: 'Open.openUrl',
      args: [props.url || ''],
    },
  ]
}
