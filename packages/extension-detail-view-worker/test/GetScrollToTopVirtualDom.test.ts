import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetScrollToTopVirtualDom from '../src/parts/GetScrollToTopVirtualDom/GetScrollToTopVirtualDom.ts'

test('getScrollToTopVirtualDom - returns empty array when disabled', () => {
  const result = GetScrollToTopVirtualDom.getScrollToTopVirtualDom(false)
  expect(result).toEqual([])
})

test('getScrollToTopVirtualDom - returns button when enabled', () => {
  const result = GetScrollToTopVirtualDom.getScrollToTopVirtualDom(true)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Button,
      className: ClassNames.ScrollToTopButton,
      childCount: 1,
      onClick: DomEventListenerFunctions.HandleClickScrollToTop,
      ariaLabel: ExtensionDetailStrings.scrollToTop(),
      name: 'scrolltotop',
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconChevronUp',
      role: 'none',
      type: 4,
    },
  ])
})
