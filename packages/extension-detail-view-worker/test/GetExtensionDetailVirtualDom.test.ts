import { expect, test } from '@jest/globals'
import * as GetExtensionDetailVirtualDom from '../src/parts/GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('extension detail virtual dom with content', () => {
  const extensionDetail = {
    name: 'Test Extension',
    iconSrc: './test-icon.png',
    description: 'Test Description',
  }
  const sanitizedReadmeHtml = '<h1>Test Header</h1>'
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, sanitizedReadmeHtml)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.Viewlet} ${ClassNames.ExtensionDetail}`,
      childCount: 3,
    },
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
    {
      childCount: 3,
      className: 'ExtensionDetailTabs',
      role: 'tablist',
      type: 4,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab ExtensionDetailTabSelected',
      role: 'tab',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Details',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      role: 'tab',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Features',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      role: 'tab',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Changelog',
      type: 12,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Markdown,
      role: AriaRoles.Document,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Test Header'),
  ])
})

test.only('extension detail virtual dom with empty content', () => {
  const extensionDetail = {
    name: '',
    iconSrc: '',
    description: '',
  }
  const sanitizedReadmeHtml = ''
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, sanitizedReadmeHtml)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.Viewlet} ${ClassNames.ExtensionDetail}`,
      childCount: 2,
    },
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
      childCount: 2,
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
      childCount: 3,
      className: 'ExtensionDetailTabs',
      role: 'tablist',
      type: 4,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab ExtensionDetailTabSelected',
      role: 'tab',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Details',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      role: 'tab',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Features',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      role: 'tab',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Changelog',
      type: 12,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Markdown,
      role: AriaRoles.Document,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
      childCount: 0,
    },
  ])
})
