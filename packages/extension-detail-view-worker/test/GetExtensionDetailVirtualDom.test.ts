import { expect, test } from '@jest/globals'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetExtensionDetailVirtualDom from '../src/parts/GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('extension detail virtual dom with content', () => {
  const extensionDetail = {
    name: 'Test Extension',
    iconSrc: './test-icon.png',
    description: 'Test Description',
  }
  const sanitizedReadmeHtml = '<h1>Test Header</h1>'
  const selectedTab = 'Details'
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, sanitizedReadmeHtml, selectedTab)).toEqual([
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
      onClick: 'handleTabsClick',
      type: 4,
      tabIndex: 0,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab ExtensionDetailTabSelected',
      role: 'tab',
      name: 'Details',
      type: 1,
      tabIndex: -1,
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
      type: 1,
      tabIndex: -1,
      name: 'Features',
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
      name: 'Changelog',
      type: 1,
      tabIndex: -1,
    },
    {
      childCount: 0,
      text: 'Changelog',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailPanel',
      role: 'panel',
      type: 4,
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

test('extension detail virtual dom with empty content', () => {
  const extensionDetail = {
    name: '',
    iconSrc: '',
    description: '',
  }
  const sanitizedReadmeHtml = ''
  const selectedTab = 'Details'
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, sanitizedReadmeHtml, selectedTab)).toEqual([
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
      onClick: 'handleTabsClick',
      role: 'tablist',
      type: 4,
      tabIndex: 0,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab ExtensionDetailTabSelected',
      role: 'tab',
      name: 'Details',
      type: 1,
      tabIndex: -1,
    },
    {
      childCount: 0,
      text: 'Details',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      name: 'Features',
      role: 'tab',
      type: 1,
      tabIndex: -1,
    },
    {
      childCount: 0,
      text: 'Features',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      name: 'Changelog',
      role: 'tab',
      type: 1,
      tabIndex: -1,
    },
    {
      childCount: 0,
      text: 'Changelog',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailPanel',
      role: 'panel',
      type: 4,
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
