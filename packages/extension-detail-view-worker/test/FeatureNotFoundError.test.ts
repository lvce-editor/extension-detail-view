import { test, expect } from '@jest/globals'
import { FeatureNotFoundError } from '../src/parts/FeatureNotFoundError/FeatureNotFoundError.ts'

test('FeatureNotFoundError should set correct message and name', () => {
  const error = new FeatureNotFoundError('my-feature')
  expect(error).toBeInstanceOf(Error)
  expect(error).toBeInstanceOf(FeatureNotFoundError)
  expect(error.message).toBe('unknown feature: my-feature')
  expect(error.name).toBe('FeatureNotFoundError')
})

test('FeatureNotFoundError should work with different feature names', () => {
  const error = new FeatureNotFoundError('another-feature')
  expect(error.message).toBe('unknown feature: another-feature')
})
