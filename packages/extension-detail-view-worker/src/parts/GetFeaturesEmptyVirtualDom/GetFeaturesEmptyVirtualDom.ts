import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeaturesEmptyVirtualDom = (): readonly VirtualDomNode[] => {
  const none = ExtensionDetailStrings.none()
  return [
    {
      childCount: 1,
      className: ClassNames.Features,
      type: VirtualDomElements.Div,
    },
    text(none),
  ]
}
