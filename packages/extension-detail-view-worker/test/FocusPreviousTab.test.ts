import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusPreviousTab from '../src/parts/FocusPreviousTab/FocusPreviousTab.ts'

test('focusPreviousTab decrements focusedTabIndex from 1 to 0', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 1,
  }
  const result = FocusPreviousTab.focusPreviousTab(state)
  expect(result.focusedTabIndex).toBe(0)
})

test('focusPreviousTab keeps focusedTabIndex at 0 when already 0', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 0,
  }
  const result = FocusPreviousTab.focusPreviousTab(state)
  expect(result.focusedTabIndex).toBe(0)
})

test('focusPreviousTab does not modify other state properties', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 1,
    name: 'Test Extension',
  }
  const result = FocusPreviousTab.focusPreviousTab(state)
  expect(result.name).toBe('Test Extension')
  expect(result.focusedTabIndex).toBe(0)
})
