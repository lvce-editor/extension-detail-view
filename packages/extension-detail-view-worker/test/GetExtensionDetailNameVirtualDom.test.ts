import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getExtensionDetailNameVirtualDom } from '../src/parts/GetExtensionDetailNameVirtualDom/GetExtensionDetailNameVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getExtensionDetailNameVirtualDom - without badge', () => {
  expect(getExtensionDetailNameVirtualDom('Test Extension', '')).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 1,
    },
    text('Test Extension'),
  ])
})

test('getExtensionDetailNameVirtualDom - with badge', () => {
  expect(getExtensionDetailNameVirtualDom('Builtin Extension', 'builtin')).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 2,
    },
    text('Builtin Extension'),
    {
      type: VirtualDomElements.Span,
      className: ClassNames.ExtensionDetailNameBadge,
      childCount: 1,
    },
    text('builtin'),
  ])
})