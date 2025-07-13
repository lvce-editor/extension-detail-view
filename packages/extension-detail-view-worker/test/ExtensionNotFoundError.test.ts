import { expect, test } from '@jest/globals'
import { ExtensionNotFoundError } from '../src/parts/ExtensionNotFoundError/ExtensionNotFoundError.ts'

test('ExtensionNotFoundError - creates error with correct message', () => {
  const extensionId = 'test-extension'
  const error = new ExtensionNotFoundError(extensionId)

  expect(error.message).toBe('extension not found: test-extension')
  expect(error.name).toBe('ExtensionNotFoundError')
  expect(error).toBeInstanceOf(Error)
  expect(error).toBeInstanceOf(ExtensionNotFoundError)
})

test('ExtensionNotFoundError - works with different extension IDs', () => {
  const extensionId = 'another-extension'
  const error = new ExtensionNotFoundError(extensionId)

  expect(error.message).toBe('extension not found: another-extension')
  expect(error.name).toBe('ExtensionNotFoundError')
})

test('ExtensionNotFoundError - works with empty string', () => {
  const extensionId = ''
  const error = new ExtensionNotFoundError(extensionId)

  expect(error.message).toBe('extension not found: ')
  expect(error.name).toBe('ExtensionNotFoundError')
})
