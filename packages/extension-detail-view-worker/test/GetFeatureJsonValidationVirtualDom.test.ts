import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../src/parts/Row/Row.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeatureJsonValidationVirtualDom from '../src/parts/GetFeatureJsonValidationVirtualDom/GetFeatureJsonValidationVirtualDom.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature json validation virtual dom with validation entries', () => {
  const jsonValidation: readonly Row[] = [
    [
      { type: TableCellType.Text, value: '*.json' },
      { type: TableCellType.Text, value: 'https://json.schemastore.org/package.json' },
    ],
    [
      { type: TableCellType.Text, value: '*.tsconfig.json' },
      { type: TableCellType.Text, value: 'https://json.schemastore.org/tsconfig.json' },
    ],
  ]
  expect(GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(jsonValidation)).toEqual([
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text('Json Validation'),
    {
      childCount: 2,
      className: ClassNames.Table,
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 2,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ClassNames.TableHeading,
      type: VirtualDomElements.Th,
    },
    text('File Match'),
    {
      childCount: 1,
      className: ClassNames.TableHeading,
      type: VirtualDomElements.Th,
    },
    text('Schema'),
    {
      childCount: 2,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 2,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('*.json'),
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('https://json.schemastore.org/package.json'),
    {
      childCount: 2,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('*.tsconfig.json'),
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('https://json.schemastore.org/tsconfig.json'),
  ])
})

test('feature json validation virtual dom with empty validation entries', () => {
  const jsonValidation: readonly Row[] = []
  expect(GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(jsonValidation)).toEqual([
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text('Json Validation'),
    {
      childCount: 2,
      className: ClassNames.Table,
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 2,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ClassNames.TableHeading,
      type: VirtualDomElements.Th,
    },
    text('File Match'),
    {
      childCount: 1,
      className: ClassNames.TableHeading,
      type: VirtualDomElements.Th,
    },
    text('Schema'),
    {
      childCount: 0,
      type: VirtualDomElements.TBody,
    },
  ])
})

test('feature json validation virtual dom with invalid entry shows squiggly and title', () => {
  const jsonValidation: readonly Row[] = [
    [
      { className: ClassNames.TableCellInvalid, title: 'Property must be a string', type: TableCellType.Text, value: '[]' },
      { className: ClassNames.TableCellInvalid, title: 'Property must be a string', type: TableCellType.Text, value: '[]' },
    ],
  ]
  const result = GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(jsonValidation)
  // last tbody row cells
  const td1 = result.find(
    (node) =>
      node.type === VirtualDomElements.Td &&
      node.className === `${ClassNames.TableCell} ${ClassNames.TableCellInvalid}` &&
      (node as any).title === 'Property must be a string',
  )
  expect(td1).toBeTruthy()
})
