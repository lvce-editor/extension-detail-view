import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickCategory } from '../src/parts/HandleClickCategory/HandleClickCategory.ts'

test.skip('handleClickCategory returns the same state', async () => {
  const state = createDefaultState()
  const result = await handleClickCategory(state, 'category-1')
  expect(result).toBe(state)
})
