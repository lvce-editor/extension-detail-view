import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWheel } from '../src/parts/HandleWheel/HandleWheel.ts'

// scroll down

test('handleWheel - scroll down', () => {
  const state = {
    ...createDefaultState(),
    readmeScrollTop: 10,
  }
  const result = handleWheel(state, 0, 5)
  expect(result.readmeScrollTop).toBe(15)
})

// scroll up (should clamp to 0)
test('handleWheel - scroll up clamp', () => {
  const state = {
    ...createDefaultState(),
    readmeScrollTop: 3,
  }
  const result = handleWheel(state, 0, -10)
  expect(result.readmeScrollTop).toBe(0)
})

test('handleWheel - no side effects', () => {
  const state = {
    ...createDefaultState(),
    readmeScrollTop: 7,
    name: 'Test',
  }
  const result = handleWheel(state, 0, 2)
  expect(result.readmeScrollTop).toBe(9)
  expect(result.name).toBe('Test')
})
