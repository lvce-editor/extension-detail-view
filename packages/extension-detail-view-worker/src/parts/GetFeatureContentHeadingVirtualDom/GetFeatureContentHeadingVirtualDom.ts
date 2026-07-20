import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const featureContentHeadingNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.H1,
}

export const getFeatureContentHeadingVirtualDom = (heading: string): readonly VirtualDomNode[] => {
  return [featureContentHeadingNode, text(heading)]
}
