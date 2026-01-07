import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'

test('renderFocus - returns focus command', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = CreateDefaultState.createDefaultState()

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - with different states', () => {
  const oldState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    selectedFeature: 'Commands',
    selectedTab: 'Features',
  }
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    selectedFeature: 'General',
    selectedTab: 'Settings',
  }

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - with empty states', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = CreateDefaultState.createDefaultState()

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - with complex states', () => {
  const oldState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    extensionId: 'test-extension',
    name: 'Test Extension',
    selectedFeature: 'Features',
    selectedTab: 'Details',
  }
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    extensionId: 'test-extension',
    name: 'Test Extension',
    selectedFeature: 'Commands',
    selectedTab: 'Features',
  }

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - when focus is 451 returns focus command with uid and tab name', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 451,
    focusedTabIndex: 0,
    tabs: [
      {
        enabled: true,
        label: 'Details',
        name: 'details-tab',
        selected: true,
      },
    ],
    uid: 123,
  }

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', 123, 'details-tab'])
})

test('renderFocus - when focus is 451 with different tab index', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 451,
    focusedTabIndex: 1,
    tabs: [
      {
        enabled: true,
        label: 'Details',
        name: 'details-tab',
        selected: false,
      },
      {
        enabled: true,
        label: 'Features',
        name: 'features-tab',
        selected: true,
      },
    ],
    uid: 456,
  }

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', 456, 'features-tab'])
})

test('renderFocus - when focus is 451 with different uid', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 451,
    focusedTabIndex: 0,
    tabs: [
      {
        enabled: true,
        label: 'Settings',
        name: 'settings-tab',
        selected: true,
      },
    ],
    uid: 789,
  }

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', 789, 'settings-tab'])
})

test('renderFocus - when focus is not 451 returns empty name', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 450,
    focusedTabIndex: 0,
    tabs: [
      {
        enabled: true,
        label: 'Details',
        name: 'details-tab',
        selected: true,
      },
    ],
    uid: 123,
  }

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - when focus is not 451 even with tabs and uid', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 452,
    focusedTabIndex: 0,
    tabs: [
      {
        enabled: true,
        label: 'Details',
        name: 'details-tab',
        selected: true,
      },
    ],
    uid: 999,
  }

  const result: readonly any[] = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})
