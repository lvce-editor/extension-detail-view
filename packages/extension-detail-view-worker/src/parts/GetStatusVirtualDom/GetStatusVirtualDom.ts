import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getStatusMessage } from '../GetStatusMessage/GetStatusMessage.ts'

const key: VirtualDomNode = {
  type: VirtualDomElements.Dt,
  childCount: 1,
  className: 'RuntimeStatusDefinitionListKey',
}

const value: VirtualDomNode = {
  type: VirtualDomElements.Dd,
  className: 'RuntimeStatusDefinitionListValue',
  childCount: 1,
}

export const getStatusVirtualDom = (status: number): readonly VirtualDomNode[] => {
  const statusString = getStatusMessage(status)
  return [
    key,
    text(`Status: `), // i18n
    value,
    text(`${statusString}`),
  ]
}
