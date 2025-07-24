import { test, expect } from '@jest/globals'
import { isLanguageBasicsExtension } from '../src/parts/IsLanguageBasicsExtension/IsLanguageBasicsExtension.ts'

test('isLanguageBasicsExtension returns true for language basics extension', () => {
  const extension = { name: 'Language Basics JavaScript' }
  const result = isLanguageBasicsExtension(extension)
  expect(result).toBe(true)
})

test('isLanguageBasicsExtension returns true for language basics extension with different language', () => {
  const extension = { name: 'Language Basics TypeScript' }
  const result = isLanguageBasicsExtension(extension)
  expect(result).toBe(true)
})

test('isLanguageBasicsExtension returns false for regular extension', () => {
  const extension = { name: 'Regular Extension' }
  const result = isLanguageBasicsExtension(extension)
  expect(result).toBe(false)
})

test('isLanguageBasicsExtension returns undefined when name is missing', () => {
  const extension = {}
  const result = isLanguageBasicsExtension(extension)
  expect(result).toBeUndefined()
})