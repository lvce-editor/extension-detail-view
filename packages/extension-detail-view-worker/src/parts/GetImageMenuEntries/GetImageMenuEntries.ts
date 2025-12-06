import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { MenuProps } from '../MenuProps/MenuProps.ts'
import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getImageMenuEntries = (props: MenuProps): readonly MenuEntry[] => {
  if (!props.isImage) {
    return []
  }
  return [
    {
      args: [props.url || ''],
      command: 'Open.openUrl',
      flags: MenuItemFlags.None,
      id: 'openImageInNewTab',
      label: ViewletExtensionDetailStrings.openImageInNewTab(),
    },
    {
      args: ['image.png', props.url || ''],
      command: 'SaveFileAs.saveFileAs',
      flags: MenuItemFlags.None,
      id: 'saveImageAs',
      label: ViewletExtensionDetailStrings.saveImageAs(),
    },
  ]
}
