import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeaturesVirtualDom = (): readonly VirtualDomNode[] => {
  // TODO set tabpanel role
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 1,
    },
    text('Not Implemented'),
  ]
}
