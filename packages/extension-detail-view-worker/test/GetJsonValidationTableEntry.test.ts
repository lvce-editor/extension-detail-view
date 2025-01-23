import { expect, test } from '@jest/globals'
import * as GetJsonValidationTableEntry from '../src/parts/GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'

test('get json validation table entry with fileMatch and schema', () => {
  const jsonValidation = {
    fileMatch: ['package.json'],
    url: 'https://example.com/schema.json',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation)).toEqual(['package.json', 'https://example.com/schema.json'])
})

test('get json validation table entry with multiple fileMatches', () => {
  const jsonValidation = {
    fileMatch: ['package.json', 'composer.json'],
    url: 'https://example.com/schema.json',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation)).toEqual([
    'package.json, composer.json',
    'https://example.com/schema.json',
  ])
})

test('get json validation table entry with empty values', () => {
  const jsonValidation = {
    fileMatch: [],
    url: '',
  }
  expect(GetJsonValidationTableEntry.getJsonValidationTableEntry(jsonValidation)).toEqual(['', ''])
})
