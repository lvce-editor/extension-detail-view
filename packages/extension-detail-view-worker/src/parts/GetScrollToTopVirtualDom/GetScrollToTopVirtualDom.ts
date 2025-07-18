import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export const getScrollToTopVirtualDom = (scrollToTopButtonEnabled: boolean): readonly VirtualDomNode[] => {
  if (!scrollToTopButtonEnabled) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Button,
      className: ClassNames.ScrollToTopButton,
      childCount: 1,
      onClick: DomEventListenerFunctions.HandleClickScrollToTop,
      ariaLabel: ExtensionDetailStrings.scrollToTop(),
      name: InputName.ScrollToTop,
    },
    {
      type: VirtualDomElements.Div,
      className: 'MaskIcon MaskIconChevronUp',
      childCount: 0,
      role: AriaRoles.None,
    },
  ]
}
