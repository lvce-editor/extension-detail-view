import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getFeatureUnsupportedVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text(ExtensionDetailStrings.unsupportedFeature()),
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text(ExtensionDetailStrings.selectedFeatureUnknownOrUnsupported()),
  ]
}
