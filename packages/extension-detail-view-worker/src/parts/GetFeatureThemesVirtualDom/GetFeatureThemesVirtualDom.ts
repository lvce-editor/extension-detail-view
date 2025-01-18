import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureThemesVirtualDom = (): readonly VirtualDomNode[] => {
  const heading = 'Themes'
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureTheme,
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
  ]
}
