import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getFeatureCommandsVirtualDom = (): readonly VirtualDomNode[] => {
  const heading = 'Commands'
  // TODO render commands table
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureCommands',
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
  ]
}
