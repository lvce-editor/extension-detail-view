import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getExtensionDetailDescriptionVirtualDom } from '../GetExtensionDetailDescriptionVirtualDom/GetExtensionDetailDescriptionVirtualDom.ts'
import * as GetExtensionDetailHeaderActionsVirtualDom from '../GetExtensionDetailHeaderActionsVirtualDom/GetExtensionDetailHeaderActionsVirtualDom.ts'
import { getExtensionDetailIconVirtualDom } from '../GetExtensionDetailIconVirtualDom/GetExtensionDetailIconVirtualDom.ts'
import { getExtensionDetailMetadataVirtualDom } from '../GetExtensionDetailMetadataVirtualDom/GetExtensionDetailMetadataVirtualDom.ts'
import { getExtensionDetailNameVirtualDom } from '../GetExtensionDetailNameVirtualDom/GetExtensionDetailNameVirtualDom.ts'

export const getExtensionDetailHeaderVirtualDom = (
  name: string,
  iconSrc: string,
  description: string,
  badge: string,
  buttonDefs: readonly ExtensionDetailButton[],
  settingsButtonEnabled: boolean,
  downloadCount: string = 'n/a',
  rating: string = 'n/a',
): readonly VirtualDomNode[] => {
  const dom = [
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeader,
      type: VirtualDomElements.Div,
    },
    getExtensionDetailIconVirtualDom(iconSrc),
    {
      childCount: 4,
      className: ClassNames.ExtensionDetailHeaderDetails,
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.Div,
    },
    ...getExtensionDetailNameVirtualDom(name, badge),
    ...getExtensionDetailDescriptionVirtualDom(description),
    ...getExtensionDetailMetadataVirtualDom(downloadCount, rating),
    ...GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom(buttonDefs, settingsButtonEnabled),
  ]
  return dom
}
