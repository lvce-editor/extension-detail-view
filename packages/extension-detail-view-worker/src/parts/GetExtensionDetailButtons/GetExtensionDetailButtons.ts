import type { ExtensionDetailButton } from './ExtensionDetailButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailButtons = (hasColorTheme: boolean, isBuiltin: boolean, isDisabled: boolean): readonly ExtensionDetailButton[] => {
  const allActions: ExtensionDetailButton[] = [
    {
      label: ExtensionDetailStrings.setColorTheme(),
      onClick: DomEventListenerFunctions.HandleClickSetColorTheme,
      enabled: hasColorTheme,
      name: InputName.SetColorTheme,
    },
    {
      label: ExtensionDetailStrings.enable(),
      onClick: DomEventListenerFunctions.HandleClickEnable,
      enabled: isDisabled,
      name: InputName.Enable,
    },
    {
      label: ExtensionDetailStrings.disable(),
      onClick: DomEventListenerFunctions.HandleClickDisable,
      enabled: !isDisabled,
      name: InputName.Disable,
    },
    {
      label: ExtensionDetailStrings.uninstall(),
      onClick: DomEventListenerFunctions.HandleClickUninstall,
      enabled: !isBuiltin,
      name: InputName.Uninstall,
    },
  ]

  const filteredButtons = allActions.filter((button) => button.enabled)
  return filteredButtons
}
