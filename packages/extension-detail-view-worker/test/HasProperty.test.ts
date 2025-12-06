import { test, expect } from '@jest/globals'
import { hasProperty } from '../src/parts/HasProperty/HasProperty.ts'

test('hasProperty returns true for object with property', () => {
  const object = { name: 'test' }
  const result = hasProperty(object, 'name')
  expect(result).toBe(true)
})

test('hasProperty returns false for object without property', () => {
  const object = { name: 'test' }
  const result = hasProperty(object, 'age')
  expect(result).toBe(false)
})

test('hasProperty returns false for null', () => {
  const result = hasProperty(null, 'name')
  expect(result).toBe(false)
})

test('hasProperty returns false for undefined', () => {
  const result = hasProperty(undefined, 'name')
  expect(result).toBe(false)
})

test('hasProperty returns false for primitive string', () => {
  const result = hasProperty('string', 'name')
  expect(result).toBe(false)
})

test('hasProperty returns false for primitive number', () => {
  const result = hasProperty(123, 'name')
  expect(result).toBe(false)
})

test('hasProperty returns true for object with multiple properties', () => {
  const object = { age: 30, name: 'test' }
  expect(hasProperty(object, 'name')).toBe(true)
  expect(hasProperty(object, 'age')).toBe(true)
  expect(hasProperty(object, 'city')).toBe(false)
})
