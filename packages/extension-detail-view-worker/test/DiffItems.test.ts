import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffItems from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual - same state reference', () => {
  const state: ExtensionDetailState = createDefaultState()
  const result = DiffItems.isEqual(state, state)
  expect(result).toBe(true)
})

test('isEqual - different state references with same content', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  }
  const result = DiffItems.isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual - different state content', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Settings',
    selectedFeature: 'Commands',
  }
  const result = DiffItems.isEqual(oldState, newState)
  expect(result).toBe(false)
})
