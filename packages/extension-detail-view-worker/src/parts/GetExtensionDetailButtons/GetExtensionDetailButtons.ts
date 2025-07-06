import type { ExtensionDetailButton } from './ExtensionDetailButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as HasColorThemes from '../HasColorThemes/HasColorThemes.ts'

export const getExtensionDetailButtons = (extension: any): readonly ExtensionDetailButton[] => {
  const allActions: ExtensionDetailButton[] = [
    {
      label: ExtensionDetailStrings.setColorTheme(),
      onClick: DomEventListenerFunctions.HandleClickSetColorTheme,
      enabled: HasColorThemes.hasColorThemes(extension)
    },
    {
      label: ExtensionDetailStrings.disable(),
      onClick: DomEventListenerFunctions.HandleClickDisable,
      enabled: true
    },
    {
      label: ExtensionDetailStrings.uninstall(),
      onClick: DomEventListenerFunctions.HandleClickUninstall,
      enabled: !extension?.builtin
    }
  ]

  return allActions
}