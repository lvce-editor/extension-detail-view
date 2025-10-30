import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetJsonValidationTableEntry from '../src/parts/GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('get json validation table entry with fileMatch and schema', () => {
  const jsonValidation = {
    fileMatch: ['package.json'],
    schema: 'https://example.com/schema.json',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation, 'https://example.com')).toEqual([
    {
      type: TableCellType.Code,
      value: ['package.json'],
    },
    {
      type: TableCellType.Link,
      value: 'https://example.com/schema.json',
      href: 'https://example.com/schema.json',
    },
  ])
})

test('get json validation table entry with multiple fileMatches', () => {
  const jsonValidation = {
    fileMatch: ['package.json', 'composer.json'],
    schema: 'https://example.com/schema.json',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation, 'https://example.com')).toEqual([
    {
      type: TableCellType.Code,
      value: ['package.json', 'composer.json'],
    },
    {
      type: TableCellType.Link,
      value: 'https://example.com/schema.json',
      href: 'https://example.com/schema.json',
    },
  ])
})

test('get json validation table entry with empty values', () => {
  const jsonValidation = {
    fileMatch: [],
    schema: '',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation, 'https://example.com')).toEqual([
    {
      type: TableCellType.Code,
      value: [],
    },
    {
      type: TableCellType.Text,
      value: '',
    },
  ])
})

test('returns invalid cells for array validation', () => {
  const validation: unknown = []
  const row = GetJsonValidationTableEntry.getJsonValidationTableEntry(validation as any, '')
  expect(row).toEqual([
    { type: TableCellType.Text, value: '[]', className: ClassNames.TableCellInvalid, title: 'property must be a string' },
    { type: TableCellType.Text, value: '[]', className: ClassNames.TableCellInvalid, title: 'property must be a string' },
  ])
})
