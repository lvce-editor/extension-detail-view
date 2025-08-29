import { test, expect } from '@jest/globals'
import { VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../src/parts/Category/Category.ts'
import type { MoreInfoEntry } from '../src/parts/MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetDetailsVirtualDom from '../src/parts/GetDetailsVirtualDom/GetDetailsVirtualDom.ts'

test('getDetailsVirtualDom should return virtual dom with readme content', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
  ]
  const width = 800
  const scrollToTopButtonEnabled = true
  const categories: readonly Category[] = []
  const resources: readonly Resource[] = []
  const showAdditionalDetailsBreakpoint = 600
  const installationEntries: readonly MoreInfoEntry[] = []
  const marketplaceEntries: readonly MoreInfoEntry[] = []
  const hasReadme = true

  const result = GetDetailsVirtualDom.getDetailsVirtualDom(
    sanitizedReadmeHtml,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    showAdditionalDetailsBreakpoint,
    installationEntries,
    marketplaceEntries,
    hasReadme,
    true,
  )

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ExtensionDetailPanel,
    childCount: 2,
    role: AriaRoles.Panel,
  })
  expect(result[1]).toBe(sanitizedReadmeHtml[0])
})

test('getDetailsVirtualDom should return virtual dom with no readme message', () => {
  const sanitizedReadmeHtml: readonly VirtualDomNode[] = []
  const width = 400
  const scrollToTopButtonEnabled = false
  const categories: readonly Category[] = []
  const resources: readonly Resource[] = []
  const showAdditionalDetailsBreakpoint = 600
  const installationEntries: readonly MoreInfoEntry[] = []
  const marketplaceEntries: readonly MoreInfoEntry[] = []
  const hasReadme = false

  const result = GetDetailsVirtualDom.getDetailsVirtualDom(
    sanitizedReadmeHtml,
    width,
    scrollToTopButtonEnabled,
    categories,
    resources,
    showAdditionalDetailsBreakpoint,
    installationEntries,
    marketplaceEntries,
    hasReadme,
    true,
  )

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ExtensionDetailPanel,
    childCount: 2,
    role: AriaRoles.Panel,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    childCount: 1,
    className: 'Markdown',
  })
  expect(result[2]).toHaveProperty('text', ExtensionDetailStrings.noReadmeFound())
})
