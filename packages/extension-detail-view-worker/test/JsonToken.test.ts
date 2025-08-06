import { expect, test } from '@jest/globals'
import type { JsonToken } from '../src/parts/JsonToken/JsonToken.ts'

test('JsonToken interface should have correct structure', () => {
  const token: JsonToken = {
    type: 'string',
    value: '"test"',
  }

  expect(token.type).toBe('string')
  expect(token.value).toBe('"test"')
})

test('JsonToken should support all token types', () => {
  const stringToken: JsonToken = { type: 'string', value: '"hello"' }
  const numberToken: JsonToken = { type: 'number', value: '123' }
  const booleanToken: JsonToken = { type: 'boolean', value: 'true' }
  const nullToken: JsonToken = { type: 'null', value: 'null' }
  const punctuationToken: JsonToken = { type: 'punctuation', value: '{' }
  const propertyNameToken: JsonToken = { type: 'propertyName', value: '"name"' }
  const propertyValueToken: JsonToken = { type: 'propertyValue', value: '"value"' }

  expect(stringToken.type).toBe('string')
  expect(numberToken.type).toBe('number')
  expect(booleanToken.type).toBe('boolean')
  expect(nullToken.type).toBe('null')
  expect(punctuationToken.type).toBe('punctuation')
  expect(propertyNameToken.type).toBe('propertyName')
  expect(propertyValueToken.type).toBe('propertyValue')
}) 