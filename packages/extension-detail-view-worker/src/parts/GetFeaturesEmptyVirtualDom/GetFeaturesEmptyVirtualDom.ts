import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeaturesEmptyVirtualDom = (): readonly VirtualDomNode[] => {
  const none = ExtensionDetailStrings.none()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 1,
    },
    text(none),
  ]
}
