import type { ExtensionDetailButton } from './ExtensionDetailButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as HasColorThemes from '../HasColorThemes/HasColorThemes.ts'

export const getExtensionDetailButtons = (extension: any): readonly ExtensionDetailButton[] => {
  const buttons: ExtensionDetailButton[] = []
  if (HasColorThemes.hasColorThemes(extension)) {
    buttons.push({ label: 'Set Color Theme', onClick: DomEventListenerFunctions.HandleClickSetColorTheme })
  }
  buttons.push({ label: ExtensionDetailStrings.disable(), onClick: DomEventListenerFunctions.HandleClickDisable })
  if (!extension?.builtin) {
    buttons.push({ label: ExtensionDetailStrings.uninstall(), onClick: DomEventListenerFunctions.HandleClickUninstall })
  }
  return buttons
}