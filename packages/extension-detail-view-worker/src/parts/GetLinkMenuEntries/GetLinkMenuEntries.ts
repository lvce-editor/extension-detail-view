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
      args: [props.url || ''],
      command: 'Open.openUrl',
      flags: MenuItemFlags.None,
      id: 'openInNewTab',
      label: ViewletExtensionDetailStrings.openInNewTab(),
    },
  ]
}
