import { test, expect } from '@jest/globals'
import { getTabClassName } from '../src/parts/GetTabClassName/GetTabClassName.ts'

test('getTabClassName returns selected class name when tab is selected', () => {
  const result = getTabClassName(true)
  expect(result).toContain('ExtensionDetailTab')
  expect(result).toContain('ExtensionDetailTabSelected')
})

test('getTabClassName returns default class name when tab is not selected', () => {
  const result = getTabClassName(false)
  expect(result).toBe('ExtensionDetailTab')
})