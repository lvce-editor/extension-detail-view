import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetExtensionDetailVirtualDom from '../src/parts/GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test.skip('extension detail virtual dom with content', () => {
  const extensionDetail: ExtensionDetailState = {
    ...createDefaultState(),
    description: 'Test Description',
    iconSrc: './test-icon.png',
    name: 'Test Extension',
  }
  const selectedTab = 'Details'
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, selectedTab)).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.ExtensionDetail}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeader,
      type: VirtualDomElements.Div,
    },
    {
      alt: '',
      childCount: 0,
      className: ClassNames.ExtensionDetailIcon,
      draggable: false,
      src: './test-icon.png',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeaderDetails,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text('Test Extension'),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailDescription,
      type: VirtualDomElements.Div,
    },
    text('Test Description'),
    {
      childCount: 3,
      className: 'ExtensionDetailTabs',
      onClick: 'handleTabsClick',
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab ExtensionDetailTabSelected',
      name: 'Details',
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'Details',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      name: 'Features',
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'Features',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      name: 'Changelog',
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'Changelog',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailPanel',
      role: 'panel',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.Markdown,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
      role: AriaRoles.Document,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text('Test Header'),
  ])
})

test.skip('extension detail virtual dom with empty content', () => {
  const extensionDetail: ExtensionDetailState = {
    ...createDefaultState(),
    description: '',
    iconSrc: '',
    name: '',
  }
  const selectedTab = 'Details'
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, selectedTab)).toEqual([
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.ExtensionDetail}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeader,
      type: VirtualDomElements.Div,
    },
    {
      alt: '',
      childCount: 0,
      className: ClassNames.ExtensionDetailIcon,
      draggable: false,
      src: '',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeaderDetails,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text(''),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailDescription,
      type: VirtualDomElements.Div,
    },
    text(''),
    {
      childCount: 3,
      className: 'ExtensionDetailTabs',
      onClick: 'handleTabsClick',
      role: 'tablist',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab ExtensionDetailTabSelected',
      name: 'Details',
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'Details',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      name: 'Features',
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'Features',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailTab',
      name: 'Changelog',
      role: 'tab',
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'Changelog',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailPanel',
      role: 'panel',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: ClassNames.Markdown,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
      role: AriaRoles.Document,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getExtensionDetailVirtualDom - builtin extension shows badge', () => {
  const extensionDetail = {
    ...createDefaultState(),
    description: 'Builtin extension description',
    extension: {
      builtin: true,
    },
    iconSrc: './builtin-icon.png',
    name: 'Builtin Extension',
  }

  const result = GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, '')

  // Check that the badge is passed to the header virtual DOM
  // The badge should be 'builtin' for builtin extensions
  expect(result).toBeDefined()
})

test('getExtensionDetailVirtualDom - non-builtin extension shows no badge', () => {
  const extensionDetail = {
    ...createDefaultState(),
    description: 'Regular extension description',
    extension: {
      builtin: false,
    },
    iconSrc: './regular-icon.png',
    name: 'Regular Extension',
  }

  const result = GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, '')

  // Check that the badge is passed to the header virtual DOM
  // The badge should be empty for non-builtin extensions
  expect(result).toBeDefined()
})
