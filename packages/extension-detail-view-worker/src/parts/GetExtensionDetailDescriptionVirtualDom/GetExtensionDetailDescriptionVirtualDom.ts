import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const extensionDetailDescriptionNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ExtensionDetailDescription,
  type: VirtualDomElements.Div,
}

export const getExtensionDetailDescriptionVirtualDom = (description: string): readonly VirtualDomNode[] => {
  return [extensionDetailDescriptionNode, text(description)]
}
