import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getCellCodeListVirtualDom } from '../src/parts/GetCellCodeListVirtualDom/GetCellCodeListVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getCellCodeListVirtualDom returns correct structure with single item', () => {
  const value: string = 'test'
  const props: { readonly listItems: readonly string[] } = {
    listItems: ['item1'],
  }
  const result = getCellCodeListVirtualDom(value, props)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('item1'),
  ])
})

test('getCellCodeListVirtualDom returns correct structure with multiple items', () => {
  const value: string = 'test'
  const props: { readonly listItems: readonly string[] } = {
    listItems: ['item1', 'item2', 'item3'],
  }
  const result = getCellCodeListVirtualDom(value, props)

  expect(result.length).toBe(7) // 1 Td + 3 items * 2 (Code + text) each
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.TableCell,
    type: VirtualDomElements.Td,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Code,
  })
  expect(result[2]).toEqual(text('item1'))
  expect(result[3]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Code,
  })
  expect(result[4]).toEqual(text('item2'))
  expect(result[5]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Code,
  })
  expect(result[6]).toEqual(text('item3'))
})

test('getCellCodeListVirtualDom returns correct structure with empty list', () => {
  const value: string = 'test'
  const props: { readonly listItems: readonly string[] } = {
    listItems: [],
  }
  const result = getCellCodeListVirtualDom(value, props)

  expect(result).toEqual([
    {
      childCount: 0,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
  ])
})

test('getCellCodeListVirtualDom ignores value parameter', () => {
  const value1: string = 'first'
  const value2: string = 'second'
  const props: { readonly listItems: readonly string[] } = {
    listItems: ['item'],
  }

  const result1 = getCellCodeListVirtualDom(value1, props)
  const result2 = getCellCodeListVirtualDom(value2, props)

  expect(result1).toEqual(result2)
})

test('getCellCodeListVirtualDom childCount matches listItems length', () => {
  const value: string = 'test'
  const props1: { readonly listItems: readonly string[] } = {
    listItems: ['a'],
  }
  const props2: { readonly listItems: readonly string[] } = {
    listItems: ['a', 'b'],
  }
  const props3: { readonly listItems: readonly string[] } = {
    listItems: ['a', 'b', 'c', 'd'],
  }

  const result1 = getCellCodeListVirtualDom(value, props1)
  const result2 = getCellCodeListVirtualDom(value, props2)
  const result3 = getCellCodeListVirtualDom(value, props3)

  expect(result1[0].childCount).toBe(1)
  expect(result2[0].childCount).toBe(2)
  expect(result3[0].childCount).toBe(4)
})

test('getCellCodeListVirtualDom creates correct structure for each list item', () => {
  const value: string = 'test'
  const props: { readonly listItems: readonly string[] } = {
    listItems: ['code1', 'code2'],
  }
  const result = getCellCodeListVirtualDom(value, props)

  // First item
  expect(result[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Code,
  })
  expect(result[2]).toEqual(text('code1'))

  // Second item
  expect(result[3]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Code,
  })
  expect(result[4]).toEqual(text('code2'))
})

test('getCellCodeListVirtualDom handles special characters in list items', () => {
  const value: string = 'test'
  const props: { readonly listItems: readonly string[] } = {
    listItems: ['item-1', 'item_2', 'item.3'],
  }
  const result = getCellCodeListVirtualDom(value, props)

  expect(result[2]).toEqual(text('item-1'))
  expect(result[4]).toEqual(text('item_2'))
  expect(result[6]).toEqual(text('item.3'))
})
