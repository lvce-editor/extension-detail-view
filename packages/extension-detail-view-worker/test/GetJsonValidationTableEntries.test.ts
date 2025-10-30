import { expect, test } from '@jest/globals'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getFeatureDetailsJsonValidation } from '../src/parts/GetFeatureDetailsJsonValidation/GetFeatureDetailsJsonValidation.ts'
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
  const { jsonValidation } = getFeatureDetailsJsonValidation(extension)
  expect(GetJsonValidationTableEntries.getJsonValidationTableEntries(jsonValidation || [])).toEqual({
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows: [
      [
        {
          type: TableCellType.Text,
          value: ['package.json'],
        },
        {
          type: TableCellType.Text,
          className: 'TableCellInvalid',
        },
      ],
      [
        {
          type: TableCellType.Code,
          value: ['composer.json'],
        },
        {
          type: TableCellType.Link,
          value: 'composer-schema.json',
          href: 'https://example.com/composer-schema.json',
        },
      ],
    ],
  })
})

test('get json validation table entries with no validations', () => {
  const extension = {}
  const { jsonValidation } = getFeatureDetailsJsonValidation(extension)
  expect(GetJsonValidationTableEntries.getJsonValidationTableEntries(jsonValidation || [])).toEqual({
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows: [],
  })
})

test('get json validation table entries with empty validations array', () => {
  const extension = {
    jsonValidation: [],
  }
  const { jsonValidation } = getFeatureDetailsJsonValidation(extension)

  expect(GetJsonValidationTableEntries.getJsonValidationTableEntries(jsonValidation || [])).toEqual({
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows: [],
  })
})
