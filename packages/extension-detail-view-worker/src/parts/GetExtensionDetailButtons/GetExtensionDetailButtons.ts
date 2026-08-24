import type { ExtensionDetailButton } from './ExtensionDetailButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

const isEnabled = (button: ExtensionDetailButton): boolean => {
  return button.enabled
}

const getEnablementButton = (isDisabled: boolean, hasWorkspace: boolean): ExtensionDetailButton => {
  if (isDisabled) {
    return {
      enabled: true,
      label: ExtensionDetailStrings.enable(),
      ...(hasWorkspace ? { menuId: MenuEntryId.ExtensionDetailEnableContextMenu } : {}),
      ...(hasWorkspace ? { menuOnClick: DomEventListenerFunctions.HandleClickEnableOptions } : {}),
      name: InputName.Enable,
      onClick: DomEventListenerFunctions.HandleClickEnable,
      onMouseEnter: DomEventListenerFunctions.HandleMouseEnterEnable,
      onMouseLeave: DomEventListenerFunctions.HandleMouseLeaveEnable,
    }
  }
  return {
    enabled: true,
    label: ExtensionDetailStrings.disable(),
    ...(hasWorkspace ? { menuId: MenuEntryId.ExtensionDetailDisableContextMenu } : {}),
    ...(hasWorkspace ? { menuOnClick: DomEventListenerFunctions.HandleClickDisableOptions } : {}),
    name: InputName.Disable,
    onClick: DomEventListenerFunctions.HandleClickDisable,
  }
}

export const getExtensionDetailButtons = (
  hasColorTheme: boolean,
  isBuiltin: boolean,
  isDisabled: boolean,
  extensionColorThemeId: string,
  extensionColorThemeLabel: string,
  currentColorThemeId: string,
  hasWorkspace: boolean = false,
): readonly ExtensionDetailButton[] => {
  const isCurrentColorTheme =
    (extensionColorThemeId !== '' && extensionColorThemeId === currentColorThemeId) ||
    (extensionColorThemeLabel !== '' && extensionColorThemeLabel === currentColorThemeId)
  const allActions: ExtensionDetailButton[] = [
    {
      enabled: hasColorTheme && !isDisabled && !isCurrentColorTheme,
      label: ExtensionDetailStrings.setColorTheme(),
      name: InputName.SetColorTheme,
      onClick: DomEventListenerFunctions.HandleClickSetColorTheme,
    },
    getEnablementButton(isDisabled, hasWorkspace),
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
