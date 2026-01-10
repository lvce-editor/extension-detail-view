import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getExtensionDetailNameVirtualDom } from '../src/parts/GetExtensionDetailNameVirtualDom/GetExtensionDetailNameVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getExtensionDetailNameVirtualDom - without badge', () => {
  expect(getExtensionDetailNameVirtualDom('Test Extension', '')).toEqual([
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text('Test Extension'),
  ])
})

test('getExtensionDetailNameVirtualDom - with badge', () => {
  expect(getExtensionDetailNameVirtualDom('Builtin Extension', 'builtin')).toEqual([
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text('Builtin Extension'),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailNameBadge,
      type: VirtualDomElements.Span,
    },
    text('builtin'),
  ])
})
