import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getScrollToTopVirtualDom = (scrollToTopButtonEnabled: boolean): readonly VirtualDomNode[] => {
  if (!scrollToTopButtonEnabled) {
    return []
  }
  return [{
    type: VirtualDomElements.Button,
    className: ClassNames.ScrollToTopButton,
    childCount: 0,
    onClick: DomEventListenerFunctions.HandleClickScrollToTop,
    ariaLabel: ExtensionDetailStrings.scrollToTop(),
  }]
}