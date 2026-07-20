import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getNameBadgeVirtualDom } from '../GetNameBadgeVirtualDom/GetNameBadgeVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const extensionDetailNameWithBadgeNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.ExtensionDetailName,
  type: VirtualDomElements.Div,
}

const extensionDetailNameTextNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Span,
}

const extensionDetailNameNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ExtensionDetailName,
  type: VirtualDomElements.Div,
}

const getExtensionDetailNameWithBadgeVirtualDom = (name: string, badge: string): readonly VirtualDomNode[] => {
  return [extensionDetailNameWithBadgeNode, extensionDetailNameTextNode, text(name), ...getNameBadgeVirtualDom(badge)]
}

const getExtensionDetailNameDefaultVirtualDom = (name: string): readonly VirtualDomNode[] => {
  return [extensionDetailNameNode, text(name)]
}

export const getExtensionDetailNameVirtualDom = (name: string, badge: string): readonly VirtualDomNode[] => {
  if (badge) {
    return getExtensionDetailNameWithBadgeVirtualDom(name, badge)
  }
  return getExtensionDetailNameDefaultVirtualDom(name)
}
