import { test, expect } from '@jest/globals'
import * as FeatureRuntimeStatusEnabled from '../src/parts/FeatureRuntimeStatusEnabled/FeatureRuntimeStatusEnabled.ts'

test('featureRuntimeStatusEnabled should return true for extension with main property', () => {
  const extension = {
    main: 'extension.js',
    name: 'test-extension',
  }

  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(extension)

  expect(result).toBe(true)
})

test('featureRuntimeStatusEnabled should return true for extension with browser property', () => {
  const extension = {
    browser: 'extension.js',
    name: 'test-extension',
  }

  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(extension)

  expect(result).toBe(true)
})

test('featureRuntimeStatusEnabled should return true for extension with both main and browser properties', () => {
  const extension = {
    main: 'extension.js',
    browser: 'extension.js',
    name: 'test-extension',
  }

  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(extension)

  expect(result).toBe(true)
})

test('featureRuntimeStatusEnabled should return false for extension without main or browser properties', () => {
  const extension = {
    name: 'test-extension',
    version: '1.0.0',
  }

  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(extension)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for null extension', () => {
  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(null)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for undefined extension', () => {
  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(undefined)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for string extension', () => {
  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled('test-extension')

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for number extension', () => {
  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(123)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for boolean extension', () => {
  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled(true)

  expect(result).toBe(false)
})

test('featureRuntimeStatusEnabled should return false for empty object', () => {
  const result = FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled({})

  expect(result).toBe(false)
})
