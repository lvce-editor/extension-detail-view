import { expect, test } from '@jest/globals'
import { getErrorMessage } from '../src/parts/GetErrorMessage/GetErrorMessage.ts'

test('returns an Error message', () => {
  expect(getErrorMessage(new Error('test error'))).toBe('test error')
})

test('returns a string error', () => {
  expect(getErrorMessage('test error')).toBe('test error')
})

test('returns a fallback for an unknown error', () => {
  expect(getErrorMessage(undefined)).toBe('Unknown error')
})
