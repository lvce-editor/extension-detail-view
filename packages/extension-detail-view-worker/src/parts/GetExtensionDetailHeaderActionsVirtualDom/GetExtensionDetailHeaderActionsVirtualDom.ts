import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetButtonVirtualDom from '../GetButtonVirtualDom/GetButtonVirtualDom.ts'
import * as GetSettingsButtonVirtualDom from '../GetSettingsButtonVirtualDom/GetSettingsButtonVirtualDom.ts'

export const getExtensionDetailHeaderActionsVirtualDom = (
  buttonDefs: readonly ExtensionDetailButton[],
  settingsButtonEnabled: boolean,
): readonly VirtualDomNode[] => {
  const enabledButtons = buttonDefs.filter((btn) => btn.enabled)
  const buttons: readonly VirtualDomNode[] = enabledButtons.flatMap((btn: ExtensionDetailButton) =>
    GetButtonVirtualDom.getButtonVirtualDom(btn.label, btn.onClick, btn.name),
  )
  const settingsButton: readonly VirtualDomNode[] = GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(settingsButtonEnabled)
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: enabledButtons.length + settingsButton.length,
      className: ClassNames.ExtensionDetailHeaderActions,
      type: VirtualDomElements.Div,
    },
    ...buttons,
    ...settingsButton,
  ]
  return dom
}
