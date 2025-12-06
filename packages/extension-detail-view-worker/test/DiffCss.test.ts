import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffCss/DiffCss.ts'

test('isEqual - same state reference', () => {
  const state: ExtensionDetailState = createDefaultState()
  const result = isEqual(state, state)
  expect(result).toBe(true)
})

test('isEqual - different state references with same paddingLeft, paddingRight, sideBarWidth', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(true)
})

test('isEqual - different paddingLeft', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 15,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual - different paddingRight', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 25,
    sideBarWidth: 200,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual - different sideBarWidth', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 250,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual - different paddingLeft, paddingRight, sideBarWidth', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 15,
    paddingRight: 25,
    sideBarWidth: 250,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual - ignores other state properties', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'old-id',
    name: 'old-extension',
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'new-id',
    name: 'new-extension',
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 200,
  }
  const result = isEqual(oldState, newState)
  expect(result).toBe(true)
})
