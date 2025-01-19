import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureProgrammingLanguagesVirtualDom = (): readonly VirtualDomNode[] => {
  // TODO use i18n string
  const heading = 'Programming Languages'
  // TODO
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureProgrammingLanguages',
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
  ]
}
