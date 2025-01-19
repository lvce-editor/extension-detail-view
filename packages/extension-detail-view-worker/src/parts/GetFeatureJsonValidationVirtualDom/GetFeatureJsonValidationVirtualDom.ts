import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureJsonValidationVirtualDom = (): readonly VirtualDomNode[] => {
  const heading = 'Json Validation'
  // TODO
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureJsonValidation',
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
  ]
}
