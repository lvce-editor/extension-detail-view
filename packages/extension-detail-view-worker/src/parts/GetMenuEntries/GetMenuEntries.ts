import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenuEntries = (props: any): any => {
  const menuEntries = []
  if (props.isLink) {
    menuEntries.push({
      id: 'openInNewTab',
      label: ViewletExtensionDetailStrings.openImageInNewTab(),
      flags: MenuItemFlags.None,
      command: 'Open.openUrl',
      args: [props.url],
    })
  } else if (props.isImage) {
    menuEntries.push(
      {
        id: 'openImageInNewTab',
        label: ViewletExtensionDetailStrings.openImageInNewTab(),
        flags: MenuItemFlags.None,
        command: 'Open.openUrl',
        args: [props.url],
      },
      {
        id: 'saveImageAs',
        label: ViewletExtensionDetailStrings.saveImageAs(),
        flags: MenuItemFlags.None,
        command: 'SaveFileAs.saveFileAs',
        args: ['image.png', props.url],
      },
    )
  }
  menuEntries.push({
    id: 'copy',
    label: ViewletExtensionDetailStrings.copy(),
    flags: MenuItemFlags.None,
    command: 'ClipBoard.execCopy',
  })
  return menuEntries
}
