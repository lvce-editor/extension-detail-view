import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'

const featureContentNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.FeatureContent,
  type: VirtualDomElements.Div,
}

const emptyCommandsNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.P,
}

export const getFeatureCommandsEmptyVirtualDom = (): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.commands()
  const emptyCommandsArray = ExtensionDetailStrings.emptyCommandsArray()
  return [
    featureContentNode,
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    emptyCommandsNode,
    text(emptyCommandsArray),
  ]
}
