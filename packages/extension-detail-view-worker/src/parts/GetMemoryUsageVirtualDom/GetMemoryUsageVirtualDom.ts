import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetDisplaySize from '../GetDisplaySize/GetDisplaySize.ts'

const definitionTermNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Dt,
}

const definitionDescriptionNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Dd,
}

export const getMemoryUsageVirtualDom = (memoryUsage: number): readonly VirtualDomNode[] => {
  if (!Number.isFinite(memoryUsage) || memoryUsage <= 0) {
    return []
  }
  return [definitionTermNode, text(ExtensionDetailStrings.memoryUsage()), definitionDescriptionNode, text(GetDisplaySize.getDisplaySize(memoryUsage))]
}
