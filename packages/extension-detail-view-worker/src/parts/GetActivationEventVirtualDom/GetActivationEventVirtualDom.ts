import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getActivationEventVirtualDom = (event: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    text(event),
  ]
}
