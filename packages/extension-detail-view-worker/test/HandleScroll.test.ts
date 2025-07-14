import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleScroll from '../src/parts/HandleScroll/HandleScroll.ts'

test('handleWheel - updates readmeScrollTop', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 0,
  }
  const result = HandleScroll.handleScroll(state, 100)
  expect(result.readmeScrollTop).toBe(100)
})

test('handleWheel - handles negative scroll values', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 100,
  }
  const result = HandleScroll.handleScroll(state, -50)
  expect(result.readmeScrollTop).toBe(0)
})
