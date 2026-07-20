import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const noReadmeNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Markdown,
  type: VirtualDomElements.Div,
}

export const getNoReadmeVirtualDom = (): readonly VirtualDomNode[] => {
  return [noReadmeNode, text(ExtensionDetailStrings.noReadmeFound())]
}
