import { test, expect } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diffType, isEqual } from '../src/parts/DiffFocus/DiffFocus.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('diffType should be RenderFocus', () => {
  expect(diffType).toBe(DiffType.RenderFocus)
})

test('isEqual should return true when states are the same object', () => {
  const state = createDefaultState()
  const result = isEqual(state, state)
  expect(result).toBe(true)
})

test('isEqual should return false when states are different objects with same content', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), name: 'test-extension' }
  const newState: ExtensionDetailState = { ...createDefaultState(), name: 'test-extension' }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual should return false when states have different content', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), name: 'old-extension' }
  const newState: ExtensionDetailState = { ...createDefaultState(), name: 'new-extension' }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual should return false when states have different selectedFeature', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), selectedFeature: 'feature1' }
  const newState: ExtensionDetailState = { ...createDefaultState(), selectedFeature: 'feature2' }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual should return false when states have different readmeScrollTop', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), readmeScrollTop: 0 }
  const newState: ExtensionDetailState = { ...createDefaultState(), readmeScrollTop: 100 }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})
