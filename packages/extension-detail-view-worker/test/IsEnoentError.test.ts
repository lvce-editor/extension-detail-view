import { expect, test } from '@jest/globals'
import * as ErrorCodes from '../src/parts/ErrorCodes/ErrorCodes.ts'
import * as IsEnoentError from '../src/parts/IsEnoentError/IsEnoentError.ts'

test('returns true for ENOENT error', () => {
  const error = new Error('file not found')
  // @ts-ignore
  error.code = ErrorCodes.ENOENT
  expect(IsEnoentError.isEnoentError(error)).toBe(true)
})

test('returns false for non-ENOENT error', () => {
  const error = new Error('some other error')
  // @ts-ignore
  error.code = 'OTHER_ERROR'
  expect(IsEnoentError.isEnoentError(error)).toBe(false)
})

test('returns false for error without code', () => {
  const error = new Error('error without code')
  expect(IsEnoentError.isEnoentError(error)).toBe(false)
})

test('returns false for null', () => {
  expect(IsEnoentError.isEnoentError(null)).toBeFalsy()
})

test('returns false for undefined', () => {
  expect(IsEnoentError.isEnoentError(undefined)).toBeFalsy()
})
