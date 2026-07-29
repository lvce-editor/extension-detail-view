import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { Tab } from '../src/parts/Tab/Tab.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusNextTab from '../src/parts/FocusNextTab/FocusNextTab.ts'

const tabs: readonly Tab[] = [
  {
    enabled: true,
    label: 'Details',
    name: 'Details',
    selected: true,
  },
  {
    enabled: true,
    label: 'Features',
    name: 'Features',
    selected: false,
  },
  {
    enabled: true,
    label: 'Changelog',
    name: 'Changelog',
    selected: false,
  },
]

test('focusNextTab increments focusedTabIndex from 0 to 1', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 0,
    tabs,
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.focusedTabIndex).toBe(1)
})

test('focusNextTab increments focusedTabIndex from 1 to 2', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 1,
    tabs,
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.focusedTabIndex).toBe(2)
})

test('focusNextTab keeps focusedTabIndex at the last tab', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 2,
    tabs,
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.focusedTabIndex).toBe(2)
})

test('focusNextTab keeps focusedTabIndex at 0 when there are no tabs', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 0,
    tabs: [],
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.focusedTabIndex).toBe(0)
})

test('focusNextTab does not modify other state properties', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 0,
    name: 'Test Extension',
    tabs,
  }
  const result = FocusNextTab.focusNextTab(state)
  expect(result.name).toBe('Test Extension')
  expect(result.focusedTabIndex).toBe(1)
})
