import { expect, test } from '@jest/globals'
import { getBadge } from '../src/parts/GetBadge/GetBadge.ts'

test('getBadge returns builtin for builtin extension when enabled', () => {
  expect(getBadge(true, true)).toBe('builtin')
})

test('getBadge returns empty string for builtin extension when disabled', () => {
  expect(getBadge(true, false)).toBe('')
})

test('getBadge returns empty string for non-builtin extension', () => {
  expect(getBadge(false, false)).toBe('')
})
