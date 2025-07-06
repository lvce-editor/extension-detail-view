import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getNameBadgeVirtualDom } from '../src/parts/GetNameBadgeVirtualDom/GetNameBadgeVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getNameBadgeVirtualDom - empty string', () => {
  expect(getNameBadgeVirtualDom('')).toEqual([])
})

test('getNameBadgeVirtualDom - builtin', () => {
  expect(getNameBadgeVirtualDom('builtin')).toEqual([
    {
      type: VirtualDomElements.Span,
      className: ClassNames.ExtensionDetailNameBadge,
      childCount: 1,
    },
    text('builtin'),
  ])
})
