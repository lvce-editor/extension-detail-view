import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { formatTime } from '../FormatTime/FormatTime.ts'

const definitionTermNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Dt,
}

const definitionDescriptionNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Dd,
}

export const getActivationTimeVirtualDom = (importTime: number, activationTime: number): readonly VirtualDomNode[] => {
  if (!activationTime && !importTime) {
    return []
  }
  const formattedImportTime = formatTime(importTime)
  const formattedTime = formatTime(activationTime)
  return [
    definitionTermNode,
    text(ExtensionDetailStrings.importTime()),
    definitionDescriptionNode,
    text(formattedImportTime),
    definitionTermNode,
    text(ExtensionDetailStrings.activationTime()),
    definitionDescriptionNode,
    text(formattedTime),
  ]
}
