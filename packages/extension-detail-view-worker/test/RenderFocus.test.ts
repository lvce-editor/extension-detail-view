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
