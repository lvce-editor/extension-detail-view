import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'

export const getFeatureCommandsEmptyVirtualDom = (): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.commands()
  const emptyCommandsArray = ExtensionDetailStrings.emptyCommandsArray()
  return [
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text(emptyCommandsArray),
  ]
}
