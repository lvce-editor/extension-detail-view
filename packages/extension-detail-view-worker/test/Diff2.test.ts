import { test, expect } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'

test.skip('diff2 should return empty array when all modules return true', () => {
  const state: ExtensionDetailState = CreateDefaultState.createDefaultState()
  ExtensionDetailStates.set(1, state, state)

  const result = Diff2.diff2(1)

  expect(result).toEqual([])
})

test.skip('diff2 should return DiffItems when DiffItems.isEqual returns false', () => {
  const oldState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), name: 'old-extension' }
  const newState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), name: 'new-extension' }
  ExtensionDetailStates.set(2, oldState, newState)

  const result = Diff2.diff2(2)

  expect(result).toContain(DiffType.RenderItems)
})

test.skip('diff2 should return DiffFocus when DiffFocus.isEqual returns false', () => {
  const oldState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), selectedFeature: 'feature1' }
  const newState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), selectedFeature: 'feature2' }
  ExtensionDetailStates.set(3, oldState, newState)

  const result = Diff2.diff2(3)

  expect(result).toContain(DiffType.RenderFocus)
})

test.skip('diff2 should return DiffScrollTop when DiffScrollTop.isEqual returns false', () => {
  const oldState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), readmeScrollTop: 0 }
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    readmeScrollTop: 100,
    scrollSource: 2, // Script
  }
  ExtensionDetailStates.set(4, oldState, newState)

  const result = Diff2.diff2(4)

  expect(result).toContain(DiffType.RenderScrollTop)
})

test.skip('diff2 should return multiple diff types when multiple modules return false', () => {
  const oldState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    name: 'old-extension',
    selectedFeature: 'feature1',
    readmeScrollTop: 0,
  }
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    name: 'new-extension',
    selectedFeature: 'feature2',
    readmeScrollTop: 100,
    scrollSource: 2, // Script
  }
  ExtensionDetailStates.set(5, oldState, newState)

  const result = Diff2.diff2(5)

  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderFocus)
  expect(result).toContain(DiffType.RenderScrollTop)
  expect(result).toHaveLength(3)
})

test.skip('diff2 should throw error for non-existent uid', () => {
  expect(() => {
    Diff2.diff2(999)
  }).toThrow()
})
