import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getBadge } from '../src/parts/GetBadge/GetBadge.ts'

test('getBadge returns builtin for builtin extension when enabled', () => {
  const extension = {
    builtin: true,
  }
  const state = createDefaultState({ builtinExtensionsBadgeEnabled: true })
  expect(getBadge(extension, state)).toBe('builtin')
})

test('getBadge returns empty string for builtin extension when disabled', () => {
  const extension = {
    builtin: true,
  }
  const state = createDefaultState({ builtinExtensionsBadgeEnabled: false })
  expect(getBadge(extension, state)).toBe('')
})

test('getBadge returns empty string for non-builtin extension', () => {
  const extension = {
    builtin: false,
  }
  const state = createDefaultState()
  expect(getBadge(extension, state)).toBe('')
})

test('getBadge returns empty string for extension without builtin property', () => {
  const extension = {}
  const state = createDefaultState()
  expect(getBadge(extension, state)).toBe('')
})

test('getBadge returns empty string for null extension', () => {
  const state = createDefaultState()
  expect(getBadge(null, state)).toBe('')
})