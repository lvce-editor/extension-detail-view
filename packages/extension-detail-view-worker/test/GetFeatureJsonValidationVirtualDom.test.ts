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
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Json Validation'),
    {
      type: VirtualDomElements.Table,
      className: ClassNames.Table,
      childCount: 2,
    },
    {
      type: VirtualDomElements.THead,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Th,
      className: ClassNames.TableHeading,
      childCount: 1,
    },
    text('File Match'),
    {
      type: VirtualDomElements.Th,
      className: ClassNames.TableHeading,
      childCount: 1,
    },
    text('Schema'),
    {
      type: VirtualDomElements.TBody,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    text('*.json'),
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    text('https://json.schemastore.org/package.json'),
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    text('*.tsconfig.json'),
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    text('https://json.schemastore.org/tsconfig.json'),
  ])
})

test('feature json validation virtual dom with empty validation entries', () => {
  const jsonValidation: readonly Row[] = []
  expect(GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(jsonValidation)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Json Validation'),
    {
      type: VirtualDomElements.Table,
      className: ClassNames.Table,
      childCount: 2,
    },
    {
      type: VirtualDomElements.THead,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Th,
      className: ClassNames.TableHeading,
      childCount: 1,
    },
    text('File Match'),
    {
      type: VirtualDomElements.Th,
      className: ClassNames.TableHeading,
      childCount: 1,
    },
    text('Schema'),
    {
      type: VirtualDomElements.TBody,
      childCount: 0,
    },
  ])
})
