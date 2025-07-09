import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getExtensionDetailDescriptionVirtualDom } from '../GetExtensionDetailDescriptionVirtualDom/GetExtensionDetailDescriptionVirtualDom.ts'
import * as GetExtensionDetailHeaderActionsVirtualDom from '../GetExtensionDetailHeaderActionsVirtualDom/GetExtensionDetailHeaderActionsVirtualDom.ts'
import { getExtensionDetailIconVirtualDom } from '../GetExtensionDetailIconVirtualDom/GetExtensionDetailIconVirtualDom.ts'
import { getExtensionDetailNameVirtualDom } from '../GetExtensionDetailNameVirtualDom/GetExtensionDetailNameVirtualDom.ts'

export const getExtensionDetailHeaderVirtualDom = (
  name: string,
  iconSrc: string,
  description: string,
  badge: string,
  buttonDefs: readonly ExtensionDetailButton[],
  settingsButtonEnabled: boolean,
): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeader,
      childCount: 2,
    },
    getExtensionDetailIconVirtualDom(iconSrc),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderDetails,
      childCount: 3,
    },
    ...getExtensionDetailNameVirtualDom(name, badge),
    ...getExtensionDetailDescriptionVirtualDom(description),
    ...GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom(buttonDefs, settingsButtonEnabled),
  ]
  return dom
}
