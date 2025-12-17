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
    focusedTabIndex: 0,
    tabs,
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
    focusedTabIndex: 1,
    tabs,
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
    focusedTabIndex: 0,
    tabs,
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
    focusedTabIndex: 0,
    name: 'Test Extension',
    tabs,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'Features')
  expect(result.name).toBe('Test Extension')
  expect(result.focusedTabIndex).toBe(1)
})

test('handleTabFocus updates focusedTabIndex to last tab', () => {
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
    focusedTabIndex: 0,
    tabs,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'Changelog')
  expect(result.focusedTabIndex).toBe(2)
})

test('handleTabFocus keeps focusedTabIndex when tabs array is empty', () => {
  const tabs: readonly Tab[] = []
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    focusedTabIndex: 1,
    tabs,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'AnyName')
  expect(result.focusedTabIndex).toBe(1)
})

test('handleTabFocus updates focusedTabIndex when already focused on different tab', () => {
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
    focusedTabIndex: 2,
    tabs,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'Details')
  expect(result.focusedTabIndex).toBe(0)
})

test('handleTabFocus keeps focusedTabIndex when focusedTabIndex is out of bounds and tab name not found', () => {
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
    focusedTabIndex: 5,
    tabs,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'NonExistent')
  expect(result.focusedTabIndex).toBe(5)
})

test('handleTabFocus returns new state object', () => {
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
    focusedTabIndex: 0,
    tabs,
  }
  const result = HandleTabFocus.handleTabFocus(state, 'Features')
  expect(result).not.toBe(state)
  expect(result.focusedTabIndex).toBe(1)
  expect(state.focusedTabIndex).toBe(0)
})
