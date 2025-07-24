import { test, expect } from '@jest/globals'
import { isThemeExtension } from '../src/parts/IsThemeExtension/IsThemeExtension.ts'

test('isThemeExtension returns true for theme extension', () => {
  const extension = { name: 'Dark Theme' }
  const result = isThemeExtension(extension)
  expect(result).toBe(true)
})

test('isThemeExtension returns true for theme extension with different name', () => {
  const extension = { name: 'Light Theme' }
  const result = isThemeExtension(extension)
  expect(result).toBe(true)
})

test('isThemeExtension returns false for regular extension', () => {
  const extension = { name: 'Regular Extension' }
  const result = isThemeExtension(extension)
  expect(result).toBe(false)
})

test('isThemeExtension returns undefined when name is missing', () => {
  const extension = {}
  const result = isThemeExtension(extension)
  expect(result).toBeUndefined()
})