import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetCellCodeVirtualDom from '../src/parts/GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('get cell code virtual dom with string value', () => {
  const value = 'npm install'
  expect(GetCellCodeVirtualDom.getCellCodeVirtualDom(value)).toEqual([
    {
      type: 11,
      className: 'TableCell',
      childCount: 1,
    },
    {
      type: 65,
      childCount: 1,
    },
    text('npm install'),
  ])
})

test('getCellCodeVirtualDom includes className when provided', () => {
  const value: string = 'test code'
  const props: { readonly className: string } = {
    className: 'CustomClass',
  }
  const result = GetCellCodeVirtualDom.getCellCodeVirtualDom(value, props)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Td,
    className: `${ClassNames.TableCell} CustomClass`,
    childCount: 1,
  })
})

test('getCellCodeVirtualDom includes title when provided', () => {
  const value: string = 'test code'
  const props: { readonly title: string } = {
    title: 'Tooltip text',
  }
  const result = GetCellCodeVirtualDom.getCellCodeVirtualDom(value, props)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Td,
    className: ClassNames.TableCell,
    childCount: 1,
    title: 'Tooltip text',
  })
})

test('getCellCodeVirtualDom includes both className and title when provided', () => {
  const value: string = 'test code'
  const props: { readonly className: string; readonly title: string } = {
    className: 'CustomClass',
    title: 'Tooltip text',
  }
  const result = GetCellCodeVirtualDom.getCellCodeVirtualDom(value, props)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Td,
    className: `${ClassNames.TableCell} CustomClass`,
    childCount: 1,
    title: 'Tooltip text',
  })
})

test('getCellCodeVirtualDom does not include title when not provided', () => {
  const value: string = 'test code'
  const result = GetCellCodeVirtualDom.getCellCodeVirtualDom(value)

  expect(result[0].title).toBeUndefined()
})
