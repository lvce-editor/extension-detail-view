import { expect, test } from '@jest/globals'
import { isBuiltinExtension } from '../src/parts/IsBuiltinExtension/IsBuiltinExtension.ts'

test('returns true when the extension id starts with builtin', () => {
  expect(isBuiltinExtension({ id: 'builtin.language-basics-java' })).toBe(true)
})

test('returns true when builtin metadata is set', () => {
  expect(isBuiltinExtension({ builtin: true, id: 'test-extension' })).toBe(true)
  expect(isBuiltinExtension({ id: 'test-extension', isBuiltin: true })).toBe(true)
})

test('returns false for a marketplace extension', () => {
  expect(isBuiltinExtension({ id: 'publisher.extension' })).toBe(false)
})

test('returns false when the extension is missing', () => {
  expect(isBuiltinExtension(undefined)).toBe(false)
})
