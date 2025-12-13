import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../src/parts/Category/Category.ts'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetChangelogVirtualDom from '../src/parts/GetChangelogVirtualDom/GetChangelogVirtualDom.ts'
import * as GetDetailsVirtualDom from '../src/parts/GetDetailsVirtualDom/GetDetailsVirtualDom.ts'
import * as GetExtensionDetailContentVirtualDom from '../src/parts/GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetFeaturesVirtualDom from '../src/parts/GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getExtensionDetailContentVirtualDom - Changelog tab', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = []
  const selectedTab = InputName.Changelog
  const width = 800
  const scrollToTopButtonEnabled = false
  const categories: readonly Category[] = []
  const resources: readonly Resource[] = []
  const breakpoint = 600
  const changelogDom: readonly VirtualDomNode[] = [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
  ]
  const state: ExtensionDetailState = createDefaultState()

  const result = GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
    sanitizedReadmeHtml,
    selectedTab,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    changelogDom,
    state,
  )

  const expected = GetChangelogVirtualDom.getChangelogVirtualDom(changelogDom)
  expect(result).toEqual(expected)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.Changelog,
    type: VirtualDomElements.Div,
  })
})

test('getExtensionDetailContentVirtualDom - Details tab', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
  ]
  const selectedTab = InputName.Details
  const width = 800
  const scrollToTopButtonEnabled = true
  const categories: readonly Category[] = []
  const resources: readonly Resource[] = []
  const breakpoint = 600
  const changelogDom: readonly VirtualDomNode[] = []
  const state: ExtensionDetailState = createDefaultState()

  const result = GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
    sanitizedReadmeHtml,
    selectedTab,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    changelogDom,
    state,
  )

  const expected = GetDetailsVirtualDom.getDetailsVirtualDom(
    sanitizedReadmeHtml,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    state.installationEntries,
    state.marketplaceEntries,
    state.hasReadme,
    state.showSideBar,
  )
  expect(result).toEqual(expected)
})

test('getExtensionDetailContentVirtualDom - Features tab', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = []
  const selectedTab = InputName.Features
  const width = 800
  const scrollToTopButtonEnabled = false
  const categories: readonly Category[] = []
  const resources: readonly Resource[] = []
  const breakpoint = 600
  const changelogDom: readonly VirtualDomNode[] = []
  const state: ExtensionDetailState = createDefaultState()

  const result = GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
    sanitizedReadmeHtml,
    selectedTab,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    changelogDom,
    state,
  )

  const expected = GetFeaturesVirtualDom.getFeaturesVirtualDom(state.features, state.selectedFeature, state)
  expect(result).toEqual(expected)
})

test('getExtensionDetailContentVirtualDom - default case (unknown tab)', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = []
  const selectedTab = 'UnknownTab'
  const width = 800
  const scrollToTopButtonEnabled = false
  const categories: readonly Category[] = []
  const resources: readonly Resource[] = []
  const breakpoint = 600
  const changelogDom: readonly VirtualDomNode[] = []
  const state: ExtensionDetailState = createDefaultState()

  const result = GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
    sanitizedReadmeHtml,
    selectedTab,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    changelogDom,
    state,
  )

  expect(result).toEqual([])
})

test('getExtensionDetailContentVirtualDom - Details tab with different state values', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
  ]
  const selectedTab = InputName.Details
  const width = 1000
  const scrollToTopButtonEnabled = false
  const categories: readonly Category[] = [{ id: 'test-category', label: 'Test Category' }]
  const resources: readonly Resource[] = [{ icon: 'test-icon', label: 'Test Resource', url: 'https://example.com' }]
  const breakpoint = 800
  const changelogDom: readonly VirtualDomNode[] = []
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    hasReadme: true,
    installationEntries: [{ key: 'Install', value: 'Test' }],
    marketplaceEntries: [{ key: 'Marketplace', value: 'Test' }],
    showSideBar: false,
  }

  const result = GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
    sanitizedReadmeHtml,
    selectedTab,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    changelogDom,
    state,
  )

  const expected = GetDetailsVirtualDom.getDetailsVirtualDom(
    sanitizedReadmeHtml,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    state.installationEntries,
    state.marketplaceEntries,
    state.hasReadme,
    state.showSideBar,
  )
  expect(result).toEqual(expected)
})

test('getExtensionDetailContentVirtualDom - Features tab with features', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = []
  const selectedTab = InputName.Features
  const width = 800
  const scrollToTopButtonEnabled = false
  const categories: readonly Category[] = []
  const resources: readonly Resource[] = []
  const breakpoint = 600
  const changelogDom: readonly VirtualDomNode[] = []
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      {
        id: 'Theme',
        label: 'Theme',
        selected: true,
      },
    ],
    selectedFeature: 'Theme',
  }

  const result = GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
    sanitizedReadmeHtml,
    selectedTab,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    breakpoint,
    changelogDom,
    state,
  )

  const expected = GetFeaturesVirtualDom.getFeaturesVirtualDom(state.features, state.selectedFeature, state)
  expect(result).toEqual(expected)
})
