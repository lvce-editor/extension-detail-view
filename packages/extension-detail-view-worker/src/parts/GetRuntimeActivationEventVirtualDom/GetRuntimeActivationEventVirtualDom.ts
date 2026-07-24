import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

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

const code: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Code,
}

export const getRuntimeActivationEventVirtualDom = (activationEvent: string): readonly VirtualDomNode[] => {
  if (!activationEvent) {
    return []
  }
  return [key, text(`${ExtensionDetailStrings.activationEvent()}: `), value, code, text(activationEvent)]
}
