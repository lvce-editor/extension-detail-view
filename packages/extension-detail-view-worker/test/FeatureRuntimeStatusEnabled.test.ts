import { test, expect } from '@jest/globals'
import { featureRuntimeStatusEnabled } from '../src/parts/FeatureRuntimeStatusEnabled/FeatureRuntimeStatusEnabled.ts'

test('featureRuntimeStatusEnabled should return true for extension with main property', () => {
  const extension = {
    main: 'extension.js',
    name: 'test-extension',
  }

  const result = featureRuntimeStatusEnabled(extension)

  expect(result).toBe(true)
})

test('featureRuntimeStatusEnabled should return true for extension with browser property', () => {
  const extension = {
    browser: 'extension.js',
    name: 'test-extension',
  }

  const result = featureRuntimeStatusEnabled(extension)

  expect(result).toBe(true)
})

test('featureRuntimeStatusEnabled should return true for extension with both main and browser properties', () => {
  const extension = {
    main: 'extension.js',
    browser: 'extension.js',
    name: 'test-extension',
  }

  const result = featureRuntimeStatusEnabled(extension)

  expect(result).toBe(true)
})

test('featureRuntimeStatusEnabled should return false for extension without main or browser properties', () => {
  const extension = {
    name: 'test-extension',
    version: '1.0.0',
  }

  const result = featureRuntimeStatusEnabled(extension)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for null extension', () => {
  const result = featureRuntimeStatusEnabled(null)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for undefined extension', () => {
  const result = featureRuntimeStatusEnabled(undefined)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for string extension', () => {
  const result = featureRuntimeStatusEnabled('test-extension')

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for number extension', () => {
  const result = featureRuntimeStatusEnabled(123)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for boolean extension', () => {
  const result = featureRuntimeStatusEnabled(true)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for empty object', () => {
  const result = featureRuntimeStatusEnabled({})

  expect(result).toBe(false)
})
