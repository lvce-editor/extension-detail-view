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
      type: VirtualDomElements.Div,
      className: ClassNames.Aside,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetails,
      tabIndex: 0,
      childCount: 4,
    },
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('First Heading', [], GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Second Heading', [], GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
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
      type: VirtualDomElements.Div,
      className: ClassNames.Aside,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetails,
      tabIndex: 0,
      childCount: 4,
    },
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Info', mockEntries, GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('More Info', mockEntries, GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Categories', mockCategories, GetCategoriesDom.getCategoriesDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Resources', mockResources, GetResourcesVirtualDom.getResourcesVirtualDom),
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
      type: VirtualDomElements.Div,
      className: ClassNames.Aside,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetails,
      tabIndex: 0,
      childCount: 4,
    },
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Custom Info', [], GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Custom More Info', [], GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Custom Categories', [], GetCategoriesDom.getCategoriesDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom('Custom Resources', [], GetResourcesVirtualDom.getResourcesVirtualDom),
  ])
})