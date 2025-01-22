import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getFeatureContentHeadingVirtualDom = (heading: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
  ]
}
