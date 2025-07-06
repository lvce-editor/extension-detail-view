import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getExtensionDetailDescriptionVirtualDom } from '../src/parts/GetExtensionDetailDescriptionVirtualDom/GetExtensionDetailDescriptionVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getExtensionDetailDescriptionVirtualDom - with description', () => {
  expect(getExtensionDetailDescriptionVirtualDom('Test Description')).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text('Test Description'),
  ])
})

test('getExtensionDetailDescriptionVirtualDom - empty description', () => {
  expect(getExtensionDetailDescriptionVirtualDom('')).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text(''),
  ])
})
