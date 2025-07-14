import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

const li: VirtualDomNode = {
  type: VirtualDomElements.Li,
  childCount: 1,
}

const code = {
  type: VirtualDomElements.Code,
  childCount: 1,
}

export const getActivationEventVirtualDom = (event: string): readonly VirtualDomNode[] => {
  return [li, code, text(event)]
}
