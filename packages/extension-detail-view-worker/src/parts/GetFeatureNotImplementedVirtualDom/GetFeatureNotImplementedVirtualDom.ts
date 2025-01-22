import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureNotImplementedVirtualDom = (): readonly VirtualDomNode[] => {
  const heading = 'Not implemented'
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureJsonValidation,
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
  ]
}
