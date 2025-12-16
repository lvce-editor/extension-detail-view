import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetAdditionalDetailsEntryVirtualDom from '../src/parts/GetAdditionalDetailsEntryVirtualDom/GetAdditionalDetailsEntryVirtualDom.ts'
import * as GetAdditionalDetailsVirtualDom from '../src/parts/GetAdditionalDetailsVirtualDom/GetAdditionalDetailsVirtualDom.ts'
import * as GetCategoriesDom from '../src/parts/GetCategoriesDom/GetCategoriesDom.ts'
import * as GetMoreInfoVirtualDom from '../src/parts/GetMoreInfoVirtualDom/GetMoreInfoVirtualDom.ts'
import * as GetResourcesVirtualDom from '../src/parts/GetResourcesVirtualDom/GetResourcesVirtualDom.ts'

test('getAdditionalDetailsVirtualDom - showAdditionalDetails false', () => {
  const result = GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(
    false,
    'First Heading',
    [],
    'Second Heading',
    [],
    'Third Heading',
    [],
    'Fourth Heading',
    [],
  )
  expect(result).toEqual([])
})

test('getAdditionalDetailsVirtualDom - showAdditionalDetails true with empty data', () => {
  const result = GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(
    true,
    'First Heading',
    [],
    'Second Heading',
    [],
    'Third Heading',
    [],
    'Fourth Heading',
    [],
  )
  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.Aside,
      type: VirtualDomElements.Aside,
    },
    {
      childCount: 3,
      className: ClassNames.AdditionalDetails,
      onContextMenu: 15,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('First Heading', [], GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Third Heading', [], GetCategoriesDom.getCategoriesDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Fourth Heading', [], GetResourcesVirtualDom.getResourcesVirtualDom),
  ])
})

test('getAdditionalDetailsVirtualDom - with sample data', () => {
  const mockEntries = [{ key: 'test', value: 'value' }] as any
  const mockCategories = [{ name: 'test' }] as any
  const mockResources = [{ name: 'test' }] as any

  const result = GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(
    true,
    'Info',
    mockEntries,
    'More Info',
    mockEntries,
    'Categories',
    mockCategories,
    'Resources',
    mockResources,
  )
  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.Aside,
      type: VirtualDomElements.Aside,
    },
    {
      childCount: 4,
      className: ClassNames.AdditionalDetails,
      onContextMenu: 15,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Info', mockEntries, GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('More Info', mockEntries, GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Categories', mockCategories, GetCategoriesDom.getCategoriesDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(
      'Resources',
      mockResources,
      GetResourcesVirtualDom.getResourcesVirtualDom,
    ),
  ])
})

test('getAdditionalDetailsVirtualDom - different headings', () => {
  const result = GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(
    true,
    'Custom Info',
    [],
    'Custom More Info',
    [],
    'Custom Categories',
    [],
    'Custom Resources',
    [],
  )
  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.Aside,
      type: VirtualDomElements.Aside,
    },
    {
      childCount: 3,
      className: ClassNames.AdditionalDetails,
      onContextMenu: 15,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Custom Info', [], GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Custom Categories', [], GetCategoriesDom.getCategoriesDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Custom Resources', [], GetResourcesVirtualDom.getResourcesVirtualDom),
  ])
})

test('getAdditionalDetailsVirtualDom - marketplace section not rendered when empty', () => {
  const mockEntries = [{ key: 'test', value: 'value' }] as any
  const mockCategories = [{ name: 'test' }] as any
  const mockResources = [{ name: 'test' }] as any

  const result = GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(
    true,
    'Installation',
    mockEntries,
    'Marketplace',
    [],
    'Categories',
    mockCategories,
    'Resources',
    mockResources,
  )

  const resultString = JSON.stringify(result)
  expect(resultString).not.toContain('Marketplace')
  expect(result[1].childCount).toBe(3)
})
