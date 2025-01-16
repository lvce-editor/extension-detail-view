import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { MenuProps } from '../MenuProps/MenuProps.ts'
import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

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
