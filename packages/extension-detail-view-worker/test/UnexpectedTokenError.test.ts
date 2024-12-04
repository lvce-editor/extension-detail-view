import { expect, test } from '@jest/globals'
import { UnexpectedTokenError } from '../src/parts/UnexpectedTokenError/UnexpectedTokenError.ts'

test('error message', () => {
  const error = new UnexpectedTokenError()
  expect(error.message).toBe('Unexpected token')
})

test('error name', () => {
  const error = new UnexpectedTokenError()
  expect(error.name).toBe('UnexpectedTokenError')
})

test('instanceof Error', () => {
  const error = new UnexpectedTokenError()
  expect(error instanceof Error).toBe(true)
})

test('instanceof UnexpectedTokenError', () => {
  const error = new UnexpectedTokenError()
  expect(error instanceof UnexpectedTokenError).toBe(true)
})
