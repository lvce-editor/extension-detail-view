import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const unsupportedFeatureNode: VirtualDomNode = {
  childCount: 2,
  type: VirtualDomElements.Div,
}

const unsupportedFeatureHeadingNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.H1,
}

const unsupportedFeatureMessageNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.P,
}

export const getFeatureUnsupportedVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return [
    unsupportedFeatureNode,
    unsupportedFeatureHeadingNode,
    text(ExtensionDetailStrings.unsupportedFeature()),
    unsupportedFeatureMessageNode,
    text(ExtensionDetailStrings.selectedFeatureUnknownOrUnsupported()),
  ]
}
