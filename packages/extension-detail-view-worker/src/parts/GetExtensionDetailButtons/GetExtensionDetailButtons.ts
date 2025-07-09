import type { ExtensionDetailButton } from './ExtensionDetailButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as HasColorThemes from '../HasColorThemes/HasColorThemes.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailButtons = (extension: any): readonly ExtensionDetailButton[] => {
  const allActions: ExtensionDetailButton[] = [
    {
      label: ExtensionDetailStrings.setColorTheme(),
      onClick: DomEventListenerFunctions.HandleClickSetColorTheme,
      enabled: HasColorThemes.hasColorThemes(extension),
      name: InputName.SetColorTheme,
    },
    {
      label: ExtensionDetailStrings.disable(),
      onClick: DomEventListenerFunctions.HandleClickDisable,
      enabled: true,
      name: InputName.Disable,
    },
    {
      label: ExtensionDetailStrings.uninstall(),
      onClick: DomEventListenerFunctions.HandleClickUninstall,
      enabled: !extension?.builtin,
      name: InputName.Uninstall,
    },
  ]

  return allActions
}
