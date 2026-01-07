import type { ExtensionDetailButton } from './ExtensionDetailButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'

const isEnabled = (button: ExtensionDetailButton): boolean => {
  return button.enabled
}

export const getExtensionDetailButtons = (hasColorTheme: boolean, isBuiltin: boolean, isDisabled: boolean): readonly ExtensionDetailButton[] => {
  const allActions: ExtensionDetailButton[] = [
    {
      enabled: hasColorTheme && !isDisabled,
      label: ExtensionDetailStrings.setColorTheme(),
      name: InputName.SetColorTheme,
      onClick: DomEventListenerFunctions.HandleClickSetColorTheme,
    },
    {
      enabled: isDisabled,
      label: ExtensionDetailStrings.enable(),
      name: InputName.Enable,
      onClick: DomEventListenerFunctions.HandleClickEnable,
    },
    {
      enabled: !isDisabled,
      label: ExtensionDetailStrings.disable(),
      name: InputName.Disable,
      onClick: DomEventListenerFunctions.HandleClickDisable,
    },
    {
      enabled: !isBuiltin,
      label: ExtensionDetailStrings.uninstall(),
      name: InputName.Uninstall,
      onClick: DomEventListenerFunctions.HandleClickUninstall,
    },
  ]

  const filteredButtons = allActions.filter(isEnabled)
  return filteredButtons
}
