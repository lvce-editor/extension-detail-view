import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('createDefaultState returns default extension detail state', () => {
  const state = createDefaultState()
  expect(state).toBeDefined()
})
