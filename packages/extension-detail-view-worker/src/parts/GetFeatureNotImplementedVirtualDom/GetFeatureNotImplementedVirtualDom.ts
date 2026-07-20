import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const featureContentNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.FeatureContent,
  type: VirtualDomElements.Div,
}

const notImplementedHeadingNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.H1,
}

export const getFeatureNotImplementedVirtualDom = (): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.notImplemented()
  return [featureContentNode, notImplementedHeadingNode, text(heading)]
}
