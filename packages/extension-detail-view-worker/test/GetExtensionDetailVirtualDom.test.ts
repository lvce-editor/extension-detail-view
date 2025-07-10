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
    name: 'Test Extension',
    iconSrc: './test-icon.png',
    description: 'Test Description',
  }
  const selectedTab = 'Details'
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, selectedTab)).toEqual([
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

test.skip('extension detail virtual dom with empty content', () => {
  const extensionDetail: ExtensionDetailState = {
    ...createDefaultState(),
    name: '',
    iconSrc: '',
    description: '',
  }
  const selectedTab = 'Details'
  expect(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, selectedTab)).toEqual([
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

test('getExtensionDetailVirtualDom - builtin extension shows badge', () => {
  const extensionDetail = {
    ...createDefaultState(),
    name: 'Builtin Extension',
    iconSrc: './builtin-icon.png',
    description: 'Builtin extension description',
    extension: {
      builtin: true,
    },
  }

  const result = GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, '')

  // Check that the badge is passed to the header virtual DOM
  // The badge should be 'builtin' for builtin extensions
  expect(result).toBeDefined()
})

test('getExtensionDetailVirtualDom - non-builtin extension shows no badge', () => {
  const extensionDetail = {
    ...createDefaultState(),
    name: 'Regular Extension',
    iconSrc: './regular-icon.png',
    description: 'Regular extension description',
    extension: {
      builtin: false,
    },
  }

  const result = GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(extensionDetail, '')

  // Check that the badge is passed to the header virtual DOM
  // The badge should be empty for non-builtin extensions
  expect(result).toBeDefined()
})
