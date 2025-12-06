import { test, expect } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('diff2 should return empty array when all modules return true', () => {
  const state: ExtensionDetailState = CreateDefaultState.createDefaultState()
  ExtensionDetailStates.set(1, state, state)

  const result = Diff2.diff2(1)

  expect(result).toEqual([])
})

test('diff2 should return DiffItems when DiffItems.isEqual returns false', () => {
  const oldState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), name: 'old-extension' }
  const newState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), name: 'new-extension' }
  ExtensionDetailStates.set(2, oldState, newState)

  const result = Diff2.diff2(2)

  expect(result).toContain(DiffType.RenderItems)
  expect(result).toHaveLength(1)
})

test('diff2 should return DiffFocus when DiffFocus.isEqual returns false', () => {
  const baseState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const oldState: ExtensionDetailState = baseState
  const newState: ExtensionDetailState = { ...baseState, focus: 1 }
  ExtensionDetailStates.set(3, oldState, newState)

  const result = Diff2.diff2(3)

  expect(result).toContain(DiffType.RenderFocus)
  expect(result.length).toBeGreaterThanOrEqual(1)
})

test('diff2 should return DiffScrollTop when DiffScrollTop.isEqual returns false', () => {
  const baseState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const oldState: ExtensionDetailState = baseState
  const newState: ExtensionDetailState = {
    ...baseState,
    readmeScrollTop: 100,
    scrollSource: InputSource.Script,
  }
  ExtensionDetailStates.set(4, oldState, newState)

  const result = Diff2.diff2(4)

  expect(result).toContain(DiffType.RenderScrollTop)
  expect(result.length).toBeGreaterThanOrEqual(1)
})

test('diff2 should return DiffCss when DiffCss.isEqual returns false', () => {
  const baseState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const oldState: ExtensionDetailState = baseState
  const newState: ExtensionDetailState = { ...baseState, paddingLeft: 10 }
  ExtensionDetailStates.set(6, oldState, newState)

  const result = Diff2.diff2(6)

  expect(result).toContain(DiffType.RenderCss)
  expect(result.length).toBeGreaterThanOrEqual(1)
})

test('diff2 should return multiple diff types when multiple modules return false', () => {
  const oldState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 0,
    name: 'old-extension',
    paddingLeft: 0,
    readmeScrollTop: 0,
  }
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 1,
    name: 'new-extension',
    paddingLeft: 10,
    readmeScrollTop: 100,
    scrollSource: InputSource.Script,
  }
  ExtensionDetailStates.set(5, oldState, newState)

  const result = Diff2.diff2(5)

  expect(result).toContain(DiffType.RenderItems)
  expect(result).toContain(DiffType.RenderFocus)
  expect(result).toContain(DiffType.RenderScrollTop)
  expect(result).toContain(DiffType.RenderCss)
  expect(result).toHaveLength(4)
})

test('diff2 should throw error for non-existent uid', () => {
  expect(() => {
    Diff2.diff2(999)
  }).toThrow()
})

test('diff2 should not return DiffScrollTop when scrollSource is User', () => {
  const baseState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const oldState: ExtensionDetailState = baseState
  const newState: ExtensionDetailState = {
    ...baseState,
    readmeScrollTop: 100,
    scrollSource: InputSource.User,
  }
  ExtensionDetailStates.set(7, oldState, newState)

  const result = Diff2.diff2(7)

  expect(result).not.toContain(DiffType.RenderScrollTop)
})

test('diff2 should return DiffScrollTop when selectedTab changes and scrollSource is Script', () => {
  const oldState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    readmeScrollTop: 0,
    selectedTab: 'tab1',
  }
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    readmeScrollTop: 0,
    scrollSource: InputSource.Script,
    selectedTab: 'tab2',
  }
  ExtensionDetailStates.set(8, oldState, newState)

  const result = Diff2.diff2(8)

  expect(result).toContain(DiffType.RenderScrollTop)
  expect(result).toContain(DiffType.RenderItems)
  expect(result.length).toBeGreaterThanOrEqual(2)
})
