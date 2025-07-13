import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'

test('diff2 should return empty array when all modules return true', () => {
  const state = createDefaultState()
  ExtensionDetailStates.set(1, state, state)

  const result = diff2(1)

  expect(result).toEqual([])
})

test('diff2 should return DiffItems when DiffItems.isEqual returns false', () => {
  const oldState = createDefaultState({ name: 'old-extension' })
  const newState = createDefaultState({ name: 'new-extension' })
  ExtensionDetailStates.set(2, oldState, newState)

  const result = diff2(2)

  expect(result).toContain(DiffType.RenderItems)
})

test('diff2 should return DiffFocus when DiffFocus.isEqual returns false', () => {
  const oldState = createDefaultState({ selectedFeature: 'feature1' })
  const newState = createDefaultState({ selectedFeature: 'feature2' })
  ExtensionDetailStates.set(3, oldState, newState)

  const result = diff2(3)

  expect(result).toContain(DiffType.RenderFocus)
})

test('diff2 should return DiffScrollTop when DiffScrollTop.isEqual returns false', () => {
  const oldState = createDefaultState({ readmeScrollTop: 0 })
  const newState = createDefaultState({
    readmeScrollTop: 100,
    scrollSource: 2 // Script
  })
  ExtensionDetailStates.set(4, oldState, newState)

  const result = diff2(4)

  expect(result).toContain(DiffType.RenderScrollTop)
})

test('diff2 should return multiple diff types when multiple modules return false', () => {
  const oldState = createDefaultState({
    name: 'old-extension',
    selectedFeature: 'feature1',
    readmeScrollTop: 0
  })
  const newState = createDefaultState({
    name: 'new-extension',
    selectedFeature: 'feature2',
    readmeScrollTop: 100,
    scrollSource: 2 // Script
  })
  ExtensionDetailStates.set(5, oldState, newState)

  const result = diff2(5)

  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderFocus)
  expect(result).toContain(DiffType.RenderScrollTop)
  expect(result).toHaveLength(3)
})

test('diff2 should throw error for non-existent uid', () => {
  expect(() => {
    diff2(999)
  }).toThrow()
})