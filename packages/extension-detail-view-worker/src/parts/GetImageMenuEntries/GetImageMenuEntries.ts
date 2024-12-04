import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import type { MenuProps } from '../MenuProps/MenuProps.ts'

export const getImageMenuEntries = (props: MenuProps): readonly MenuEntry[] => {
  if (!props.isImage) {
    return []
  }
  return [
    {
      id: 'openImageInNewTab',
      label: ViewletExtensionDetailStrings.openImageInNewTab(),
      flags: MenuItemFlags.None,
      command: 'Open.openUrl',
      args: [props.url || ''],
    },
    {
      id: 'saveImageAs',
      label: ViewletExtensionDetailStrings.saveImageAs(),
      flags: MenuItemFlags.None,
      command: 'SaveFileAs.saveFileAs',
      args: ['image.png', props.url || ''],
    },
  ]
}
