import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetCellCodeVirtualDom from '../src/parts/GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('get cell code virtual dom with string value', () => {
  const value = 'npm install'
  expect(GetCellCodeVirtualDom.getCellCodeVirtualDom(value)).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: 11,
    },
    {
      childCount: 1,
      type: 65,
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
    childCount: 1,
    className: `${ClassNames.TableCell} CustomClass`,
    type: VirtualDomElements.Td,
  })
})

test('getCellCodeVirtualDom includes title when provided', () => {
  const value: string = 'test code'
  const props: { readonly title: string } = {
    title: 'Tooltip text',
  }
  const result = GetCellCodeVirtualDom.getCellCodeVirtualDom(value, props)

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TableCell,
    title: 'Tooltip text',
    type: VirtualDomElements.Td,
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
    childCount: 1,
    className: `${ClassNames.TableCell} CustomClass`,
    title: 'Tooltip text',
    type: VirtualDomElements.Td,
  })
})

test('getCellCodeVirtualDom does not include title when not provided', () => {
  const value: string = 'test code'
  const result = GetCellCodeVirtualDom.getCellCodeVirtualDom(value)

  expect(result[0].title).toBeUndefined()
})
