import { test, expect } from '@jest/globals'
import { getBadge } from '../src/parts/GetBadge/GetBadge.ts'

test('getBadge returns builtin for builtin extension', () => {
  const extension = {
    builtin: true,
  }
  expect(getBadge(extension)).toBe('builtin')
})

test('getBadge returns empty string for non-builtin extension', () => {
  const extension = {
    builtin: false,
  }
  expect(getBadge(extension)).toBe('')
})

test('getBadge returns empty string for extension without builtin property', () => {
  const extension = {}
  expect(getBadge(extension)).toBe('')
})

test('getBadge returns empty string for null extension', () => {
  expect(getBadge(null)).toBe('')
})