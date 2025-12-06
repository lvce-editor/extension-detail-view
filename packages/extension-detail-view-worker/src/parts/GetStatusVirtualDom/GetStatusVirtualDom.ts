import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getStatusMessage } from '../GetStatusMessage/GetStatusMessage.ts'

const key: VirtualDomNode = {
  childCount: 1,
  className: 'RuntimeStatusDefinitionListKey',
  type: VirtualDomElements.Dt,
}

const value: VirtualDomNode = {
  childCount: 1,
  className: 'RuntimeStatusDefinitionListValue',
  type: VirtualDomElements.Dd,
}

export const getStatusVirtualDom = (status: number): readonly VirtualDomNode[] => {
  const statusKey = ExtensionDetailStrings.status()
  const statusValue = getStatusMessage(status)
  return [key, text(`${statusKey}: `), value, text(`${statusValue}`)]
}
