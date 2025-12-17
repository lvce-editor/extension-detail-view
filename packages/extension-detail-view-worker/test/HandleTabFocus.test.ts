import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { Tab } from '../src/parts/Tab/Tab.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleTabFocus from '../src/parts/HandleTabFocus/HandleTabFocus.ts'

test('handleTabFocus updates focusedTabIndex to match tab with given name', () => {
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
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    tabs,
    focusedTabIndex: 0,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'Features')
  expect(result.focusedTabIndex).toBe(1)
})

test('handleTabFocus updates focusedTabIndex to first tab when name matches first tab', () => {
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
  ]
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    tabs,
    focusedTabIndex: 1,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'Details')
  expect(result.focusedTabIndex).toBe(0)
})

test('handleTabFocus keeps focusedTabIndex when tab name not found', () => {
  const tabs: readonly Tab[] = [
    {
      enabled: true,
      label: 'Details',
      name: 'Details',
      selected: true,
    },
  ]
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    tabs,
    focusedTabIndex: 0,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'NonExistent')
  expect(result.focusedTabIndex).toBe(0)
})

test('handleTabFocus does not modify other state properties', () => {
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
  ]
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    tabs,
    focusedTabIndex: 0,
    name: 'Test Extension',
  }
  const result = HandleTabFocus.handleTabFocus(state, 'Features')
  expect(result.name).toBe('Test Extension')
  expect(result.focusedTabIndex).toBe(1)
})
