import { test, expect } from '@jest/globals'
import { getColorThemeId } from '../src/parts/GetColorThemeId/GetColorThemeId.ts'

test('getColorThemeId returns undefined for null extension', () => {
  const result = getColorThemeId(null)
  expect(result).toBeUndefined()
})

test('getColorThemeId returns undefined for undefined extension', () => {
  const result = getColorThemeId(undefined)
  expect(result).toBeUndefined()
})

test('getColorThemeId returns undefined for extension without colorThemes', () => {
  const extension = { name: 'test' }
  const result = getColorThemeId(extension)
  expect(result).toBeUndefined()
})

test('getColorThemeId returns undefined for extension with empty colorThemes array', () => {
  const extension = { colorThemes: [] }
  const result = getColorThemeId(extension)
  expect(result).toBeUndefined()
})

test('getColorThemeId returns id from first colorTheme', () => {
  const extension = {
    colorThemes: [{ id: 'theme-id-1' }, { id: 'theme-id-2' }],
  }
  const result = getColorThemeId(extension)
  expect(result).toBe('theme-id-1')
})

test('getColorThemeId returns label when id is not present', () => {
  const extension = {
    colorThemes: [{ label: 'Theme Label' }],
  }
  const result = getColorThemeId(extension)
  expect(result).toBe('Theme Label')
})

test('getColorThemeId prefers id over label', () => {
  const extension = {
    colorThemes: [{ id: 'theme-id', label: 'Theme Label' }],
  }
  const result = getColorThemeId(extension)
  expect(result).toBe('theme-id')
})

test('getColorThemeId returns undefined when colorThemes is not an array', () => {
  const extension = { colorThemes: 'not-an-array' }
  const result = getColorThemeId(extension)
  expect(result).toBeUndefined()
})
