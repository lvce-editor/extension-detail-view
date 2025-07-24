import { test, expect } from '@jest/globals'
import { getName } from '../src/parts/GetName/GetName.ts'

test('getName returns extension name when available', () => {
  const extension = { name: 'Test Extension' }
  const result = getName(extension)
  expect(result).toBe('Test Extension')
})

test('getName returns extension id when name is not available', () => {
  const extension = { id: 'test-extension' }
  const result = getName(extension)
  expect(result).toBe('test-extension')
})

test('getName returns n/a when neither name nor id is available', () => {
  const extension = {}
  const result = getName(extension)
  expect(result).toBe('n/a')
})

test('getName returns n/a when extension is null', () => {
  const result = getName(null)
  expect(result).toBe('n/a')
})