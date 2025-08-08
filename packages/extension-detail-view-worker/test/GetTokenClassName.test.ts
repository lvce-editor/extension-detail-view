import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetTokenClassName from '../src/parts/GetTokenClassName/GetTokenClassName.ts'

test('getTokenClassName - string token', () => {
  const token = { type: 'string' as const, value: '"test"' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.TokenJsonString)
})

test('getTokenClassName - number token', () => {
  const token = { type: 'number' as const, value: '123' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.TokenJsonNumber)
})

test('getTokenClassName - boolean token', () => {
  const token = { type: 'boolean' as const, value: 'true' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.TokenJsonBoolean)
})

test('getTokenClassName - null token', () => {
  const token = { type: 'null' as const, value: 'null' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.TokenJsonNull)
})

test('getTokenClassName - punctuation token', () => {
  const token = { type: 'punctuation' as const, value: '{' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.TokenJsonPunctuation)
})

test('getTokenClassName - propertyName token (fallback to Token)', () => {
  const token = { type: 'propertyName' as const, value: '"name"' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.Token)
})

test('getTokenClassName - propertyValue token (fallback to Token)', () => {
  const token = { type: 'propertyValue' as const, value: '"value"' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.Token)
})

test('getTokenClassName - unknown token type (fallback to Token)', () => {
  const token = { type: 'unknown' as any, value: 'test' }
  const result = GetTokenClassName.getTokenClassName(token)
  expect(result).toBe(ClassNames.Token)
})