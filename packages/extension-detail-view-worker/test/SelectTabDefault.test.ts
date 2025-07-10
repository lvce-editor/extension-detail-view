import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectTabDefault } from '../src/parts/SelectTabDefault/SelectTabDefault.ts'

test('selectTabDefault returns the same state', async () => {
  const state = createDefaultState()
  const result = await selectTabDefault(state)
  expect(result).toBe(state)
})
