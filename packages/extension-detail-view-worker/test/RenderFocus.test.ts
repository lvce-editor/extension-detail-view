import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'

test('renderFocus - returns focus command', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - with different states', () => {
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  }
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    selectedTab: 'Settings',
    selectedFeature: 'General',
  }

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - with empty states', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocus - with complex states', () => {
  const oldState = {
    ...CreateDefaultState.createDefaultState(),
    extensionId: 'test-extension',
    name: 'Test Extension',
    selectedTab: 'Details',
    selectedFeature: 'Features',
  }
  const newState = {
    ...CreateDefaultState.createDefaultState(),
    extensionId: 'test-extension',
    name: 'Test Extension',
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  }

  const result = RenderFocus.renderFocus(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})
