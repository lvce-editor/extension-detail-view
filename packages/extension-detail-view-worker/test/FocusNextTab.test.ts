import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusNextTab from '../src/parts/FocusNextTab/FocusNextTab.ts'

test('focusNextTab increments focusedTabIndex from 0 to 1', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 0,
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.focusedTabIndex).toBe(1)
})

test('focusNextTab keeps focusedTabIndex at 1 when already 1', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 1,
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.focusedTabIndex).toBe(1)
})

test('focusNextTab does not modify other state properties', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 0,
    name: 'Test Extension',
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.name).toBe('Test Extension')
  expect(result.focusedTabIndex).toBe(1)
})
