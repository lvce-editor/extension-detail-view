import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getStatusMessage } from '../GetStatusMessage/GetStatusMessage.ts'

export const getStatusVirtualDom = (status: number): readonly VirtualDomNode[] => {
  const statusString = getStatusMessage(status)
  return [
    {
      type: VirtualDomElements.P,
      childCount: 2,
    },
    text(`Status: `), // i18n
    text(`${statusString}`),
  ]
}
