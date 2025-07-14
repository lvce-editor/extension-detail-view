import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getFeatureUnsupportedVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Unsupported Feature'),
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Selected feature is unknown or unsupported'),
  ]
}
