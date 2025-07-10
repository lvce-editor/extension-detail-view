import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleWheel from '../src/parts/HandleWheel/HandleWheel.ts'

test('handleWheel - updates readmeScrollTop', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 0,
  }
  const result = HandleWheel.handleWheel(state, 0, 100)
  expect(result.readmeScrollTop).toBe(100)
})

test('handleWheel - preserves other state properties', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 50,
    name: 'Test Extension',
    selectedTab: 'Features',
  }
  const result = HandleWheel.handleWheel(state, 0, 100)
  expect(result.readmeScrollTop).toBe(150)
  expect(result.name).toBe('Test Extension')
  expect(result.selectedTab).toBe('Features')
})

test('handleWheel - handles negative scroll values', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 100,
  }
  const result = HandleWheel.handleWheel(state, 0, -50)
  expect(result.readmeScrollTop).toBe(50)
})
