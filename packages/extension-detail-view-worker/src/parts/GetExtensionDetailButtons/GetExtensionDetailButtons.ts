import type { ExtensionDetailButton } from './ExtensionDetailButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailButtons = (hasColorTheme: boolean, isBuiltin: boolean): readonly ExtensionDetailButton[] => {
  const allActions: ExtensionDetailButton[] = [
    {
      label: ExtensionDetailStrings.setColorTheme(),
      onClick: DomEventListenerFunctions.HandleClickSetColorTheme,
      enabled: hasColorTheme,
      name: InputName.SetColorTheme,
    },
    {
      label: ExtensionDetailStrings.disable(),
      onClick: DomEventListenerFunctions.HandleClickDisable,
      enabled: !isBuiltin,
      name: InputName.Disable,
    },
    {
      label: ExtensionDetailStrings.uninstall(),
      onClick: DomEventListenerFunctions.HandleClickUninstall,
      enabled: !isBuiltin,
      name: InputName.Uninstall,
    },
  ]

  return allActions
}
