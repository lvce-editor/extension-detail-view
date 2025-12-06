import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
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
      ariaLabel: ExtensionDetailStrings.scrollToTop(),
      childCount: 1,
      className: ClassNames.ScrollToTopButton,
      name: InputName.ScrollToTop,
      onClick: DomEventListenerFunctions.HandleClickScrollToTop,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconChevronUp),
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
  ]
}
