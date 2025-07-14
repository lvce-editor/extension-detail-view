import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffScrollTop/DiffScrollTop.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('isEqual should return true when scrollSource is User', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), readmeScrollTop: 0 }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 100,
    scrollSource: InputSource.User,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(true)
})

test('isEqual should return true when readmeScrollTop values are equal', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), readmeScrollTop: 50 }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 50,
    scrollSource: InputSource.Script,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(true)
})

test('isEqual should return false when scrollSource is not User and readmeScrollTop values are different', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), readmeScrollTop: 0 }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 100,
    scrollSource: InputSource.Script,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual should return true when scrollSource is User even with different readmeScrollTop values', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), readmeScrollTop: 0 }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 200,
    scrollSource: InputSource.User,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(true)
})

test('isEqual should return false when scrollSource is Script and readmeScrollTop values are different', () => {
  const oldState: ExtensionDetailState = { ...createDefaultState(), readmeScrollTop: 50 }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 150,
    scrollSource: InputSource.Script,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})
