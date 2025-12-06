import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getCellCheckMarkVirtualDom } from '../src/parts/GetCellCheckMarkVirtualDom/GetCellCheckMarkVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getCellCheckMarkVirtualDom returns yes when checked is true', () => {
  const value: string = 'test'
  const props: { readonly checked: boolean } = { checked: true }
  const result = getCellCheckMarkVirtualDom(value, props)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('yes'),
  ])
})

test('getCellCheckMarkVirtualDom returns no when checked is false', () => {
  const value: string = 'test'
  const props: { readonly checked: boolean } = { checked: false }
  const result = getCellCheckMarkVirtualDom(value, props)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('no'),
  ])
})

test('getCellCheckMarkVirtualDom ignores value parameter', () => {
  const value1: string = 'first'
  const value2: string = 'second'
  const props: { readonly checked: boolean } = { checked: true }

  const result1 = getCellCheckMarkVirtualDom(value1, props)
  const result2 = getCellCheckMarkVirtualDom(value2, props)

  expect(result1).toEqual(result2)
  expect(result1[1]).toEqual(text('yes'))
})

test('getCellCheckMarkVirtualDom structure is correct for checked state', () => {
  const value: string = 'any value'
  const props: { readonly checked: boolean } = { checked: true }
  const result = getCellCheckMarkVirtualDom(value, props)

  expect(result.length).toBe(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TableCell,
    type: VirtualDomElements.Td,
  })
  expect(result[1]).toEqual(text('yes'))
})

test('getCellCheckMarkVirtualDom structure is correct for unchecked state', () => {
  const value: string = 'any value'
  const props: { readonly checked: boolean } = { checked: false }
  const result = getCellCheckMarkVirtualDom(value, props)

  expect(result.length).toBe(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TableCell,
    type: VirtualDomElements.Td,
  })
  expect(result[1]).toEqual(text('no'))
})
