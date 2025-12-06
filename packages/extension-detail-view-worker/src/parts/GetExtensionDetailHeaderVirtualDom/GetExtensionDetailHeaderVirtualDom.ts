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
      childCount: 2,
      className: ClassNames.ExtensionDetailHeader,
      type: VirtualDomElements.Div,
    },
    getExtensionDetailIconVirtualDom(iconSrc),
    {
      childCount: 3,
      className: ClassNames.ExtensionDetailHeaderDetails,
      type: VirtualDomElements.Div,
    },
    ...getExtensionDetailNameVirtualDom(name, badge),
    ...getExtensionDetailDescriptionVirtualDom(description),
    ...GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom(buttonDefs, settingsButtonEnabled),
  ]
  return dom
}
