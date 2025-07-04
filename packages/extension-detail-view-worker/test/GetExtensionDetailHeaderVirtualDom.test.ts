import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../src/parts/GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test.skip('extension detail header virtual dom', () => {
  const extensionDetail = {
    name: 'Test Extension',
    iconSrc: './test-icon.png',
    description: 'Test Description',
  }
  expect(GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(extensionDetail)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeader,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.ExtensionDetailIcon,
      alt: '',
      draggable: false,
      childCount: 0,
      src: './test-icon.png',
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderDetails,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 1,
    },
    text('Test Extension'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text('Test Description'),
  ])
})

test('handles missing extension details', () => {
  const extensionDetail = {
    name: '',
    iconSrc: '',
    description: '',
  }
  expect(GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(extensionDetail)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeader,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.ExtensionDetailIcon,
      alt: '',
      draggable: false,
      childCount: 0,
      src: '',
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderDetails,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 1,
    },
    text(''),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text(''),
    {
      childCount: 2,
      className: 'ExtensionDetailHeaderActions',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      onClick: 'handleClickDisable',
      type: 1,
    },
    {
      childCount: 0,
      text: 'Disable',
      type: 12,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      onClick: 'handleClickUninstall',
      type: 1,
    },
    {
      childCount: 0,
      text: 'Uninstall',
      type: 12,
    },
  ])
})
