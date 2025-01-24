import { expect, test } from '@jest/globals'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetJsonValidationTableEntries from '../src/parts/GetJsonValidationTableEntries/GetJsonValidationTableEntries.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('get json validation table entries with validations', () => {
  const extension = {
    jsonValidation: [
      {
        fileMatch: ['package.json'],
        schema: 'https://example.com/schema.json',
      },
      {
        fileMatch: ['composer.json'],
        schema: 'https://example.com/composer-schema.json',
      },
    ],
  }
  expect(GetJsonValidationTableEntries.getJsonValidationTableEntries(extension)).toEqual({
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows: [
      [
        {
          type: TableCellType.Code,
          value: ['package.json'],
        },
        {
          type: TableCellType.Code,
          value: 'https://example.com/schema.json',
        },
      ],
      [
        {
          type: TableCellType.Code,
          value: ['composer.json'],
        },
        {
          type: TableCellType.Code,
          value: 'https://example.com/composer-schema.json',
        },
      ],
    ],
  })
})

test('get json validation table entries with no validations', () => {
  const extension = {}
  expect(GetJsonValidationTableEntries.getJsonValidationTableEntries(extension)).toEqual({
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows: [],
  })
})

test('get json validation table entries with empty validations array', () => {
  const extension = {
    jsonValidation: [],
  }
  expect(GetJsonValidationTableEntries.getJsonValidationTableEntries(extension)).toEqual({
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows: [],
  })
})
