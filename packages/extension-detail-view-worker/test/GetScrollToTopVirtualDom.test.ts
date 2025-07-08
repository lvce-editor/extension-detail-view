import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetScrollToTopVirtualDom from '../src/parts/GetScrollToTopVirtualDom/GetScrollToTopVirtualDom.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'

test('getScrollToTopVirtualDom - returns empty array when disabled', () => {
  const result = GetScrollToTopVirtualDom.getScrollToTopVirtualDom(false)
  expect(result).toEqual([])
})

test('getScrollToTopVirtualDom - returns button when enabled', () => {
  const result = GetScrollToTopVirtualDom.getScrollToTopVirtualDom(true)
  expect(result).toEqual([{
    type: VirtualDomElements.Button,
    className: ClassNames.ScrollToTopButton,
    childCount: 0,
    onClick: DomEventListenerFunctions.HandleClickScrollToTop,
  }])
})