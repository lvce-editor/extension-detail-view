import { expect, test } from '@jest/globals'
import type { JsonValidationInfo } from '../src/parts/GetJsonValidationInfos/GetJsonValidationInfos.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetJsonValidationTableEntry from '../src/parts/GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('get json validation table entry with fileMatch and schema', () => {
  const jsonValidation: JsonValidationInfo = {
    errorMessage: '',
    fileMatch: ['package.json'] as any,
    isValid: true,
    schemaUrl: 'https://example.com/schema.json',
    stringValue: 'schema.json',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation)).toEqual([
    {
      type: TableCellType.Code,
      value: ['package.json'],
    },
    {
      href: 'https://example.com/schema.json',
      type: TableCellType.Link,
      value: 'schema.json',
    },
  ])
})

test('get json validation table entry with multiple fileMatches', () => {
  const jsonValidation: JsonValidationInfo = {
    errorMessage: '',
    fileMatch: ['package.json', 'composer.json'] as any,
    isValid: true,
    schemaUrl: 'https://example.com/schema.json',
    stringValue: 'schema.json',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation)).toEqual([
    {
      type: TableCellType.Code,
      value: ['package.json', 'composer.json'],
    },
    {
      href: 'https://example.com/schema.json',
      type: TableCellType.Link,
      value: 'schema.json',
    },
  ])
})

test('get json validation table entry with empty values', () => {
  const jsonValidation: JsonValidationInfo = {
    errorMessage: 'Missing property',
    fileMatch: [] as any,
    isValid: false,
    schemaUrl: '',
    stringValue: '',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation)).toEqual([
    {
      type: TableCellType.Text,
      value: [],
    },
    {
      className: 'TableCellInvalid',
      title: 'Missing property',
      type: TableCellType.Text,
      value: '',
    },
  ])
})

test('returns invalid cells for array validation', () => {
  const validation: unknown = []
  const row = GetJsonValidationTableEntry.getJsonValidationTableEntry(validation as any)
  expect(row).toEqual([{ type: TableCellType.Text }, { className: ClassNames.TableCellInvalid, type: TableCellType.Text }])
})
