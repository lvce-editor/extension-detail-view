import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getExtensionDetailIconVirtualDom } from '../src/parts/GetExtensionDetailIconVirtualDom/GetExtensionDetailIconVirtualDom.ts'

test('getExtensionDetailIconVirtualDom returns correct virtual DOM node', () => {
  const iconSrc = 'test-icon.png'
  const result = getExtensionDetailIconVirtualDom(iconSrc)

  expect(result).toEqual({
    type: VirtualDomElements.Img,
    className: ClassNames.ExtensionDetailIcon,
    alt: '',
    draggable: false,
    childCount: 0,
    src: iconSrc,
  })
})