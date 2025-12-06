import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getExtensionDetailDescriptionVirtualDom } from '../src/parts/GetExtensionDetailDescriptionVirtualDom/GetExtensionDetailDescriptionVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getExtensionDetailDescriptionVirtualDom - with description', () => {
  expect(getExtensionDetailDescriptionVirtualDom('Test Description')).toEqual([
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailDescription,
      type: VirtualDomElements.Div,
    },
    text('Test Description'),
  ])
})

test('getExtensionDetailDescriptionVirtualDom - empty description', () => {
  expect(getExtensionDetailDescriptionVirtualDom('')).toEqual([
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailDescription,
      type: VirtualDomElements.Div,
    },
    text(''),
  ])
})
