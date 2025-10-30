import { expect, test } from '@jest/globals'
import * as ParseJsonTokens from '../src/parts/ParseJsonTokens/ParseJsonTokens.ts'

test('parseJsonTokens - simple object', () => {
  const jsonString = '{"name":"test","value":123}'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '{' },
    { type: 'string', value: '"name"' },
    { type: 'punctuation', value: ':' },
    { type: 'string', value: '"test"' },
    { type: 'punctuation', value: ',' },
    { type: 'string', value: '"value"' },
    { type: 'punctuation', value: ':' },
    { type: 'number', value: '123' },
    { type: 'punctuation', value: '}' },
  ])
})

test('parseJsonTokens - array with mixed types', () => {
  const jsonString = '[1,"string",true,null]'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '[' },
    { type: 'number', value: '1' },
    { type: 'punctuation', value: ',' },
    { type: 'string', value: '"string"' },
    { type: 'punctuation', value: ',' },
    { type: 'boolean', value: 'true' },
    { type: 'punctuation', value: ',' },
    { type: 'null', value: 'null' },
    { type: 'punctuation', value: ']' },
  ])
})

test('parseJsonTokens - nested object', () => {
  const jsonString = '{"nested":{"key":"value","number":42}}'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '{' },
    { type: 'string', value: '"nested"' },
    { type: 'punctuation', value: ':' },
    { type: 'punctuation', value: '{' },
    { type: 'string', value: '"key"' },
    { type: 'punctuation', value: ':' },
    { type: 'string', value: '"value"' },
    { type: 'punctuation', value: ',' },
    { type: 'string', value: '"number"' },
    { type: 'punctuation', value: ':' },
    { type: 'number', value: '42' },
    { type: 'punctuation', value: '}' },
    { type: 'punctuation', value: '}' },
  ])
})

test('parseJsonTokens - boolean values', () => {
  const jsonString = '{"enabled":true,"disabled":false}'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '{' },
    { type: 'string', value: '"enabled"' },
    { type: 'punctuation', value: ':' },
    { type: 'boolean', value: 'true' },
    { type: 'punctuation', value: ',' },
    { type: 'string', value: '"disabled"' },
    { type: 'punctuation', value: ':' },
    { type: 'boolean', value: 'false' },
    { type: 'punctuation', value: '}' },
  ])
})

test('parseJsonTokens - null values', () => {
  const jsonString = '{"value":null}'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '{' },
    { type: 'string', value: '"value"' },
    { type: 'punctuation', value: ':' },
    { type: 'null', value: 'null' },
    { type: 'punctuation', value: '}' },
  ])
})

test('parseJsonTokens - decimal numbers', () => {
  const jsonString = '{"price":19.99,"quantity":5}'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '{' },
    { type: 'string', value: '"price"' },
    { type: 'punctuation', value: ':' },
    { type: 'number', value: '19.99' },
    { type: 'punctuation', value: ',' },
    { type: 'string', value: '"quantity"' },
    { type: 'punctuation', value: ':' },
    { type: 'number', value: '5' },
    { type: 'punctuation', value: '}' },
  ])
})

test('parseJsonTokens - empty object', () => {
  const jsonString = '{}'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '{' },
    { type: 'punctuation', value: '}' },
  ])
})

test('parseJsonTokens - empty array', () => {
  const jsonString = '[]'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '[' },
    { type: 'punctuation', value: ']' },
  ])
})

test('parseJsonTokens - whitespace handling', () => {
  const jsonString = '{"name": "test", "value": 123}'
  const result = ParseJsonTokens.parseJsonTokens(jsonString)

  expect(result).toEqual([
    { type: 'punctuation', value: '{' },
    { type: 'string', value: '"name"' },
    { type: 'punctuation', value: ':' },
    { type: 'string', value: '"test"' },
    { type: 'punctuation', value: ',' },
    { type: 'string', value: '"value"' },
    { type: 'punctuation', value: ':' },
    { type: 'number', value: '123' },
    { type: 'punctuation', value: '}' },
  ])
})
