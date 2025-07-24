import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickDisable } from '../src/parts/HandleClickDisable/HandleClickDisable.ts'

test.skip('handleClickDisable returns the same state', async () => {
  const state = createDefaultState()
  const result = await handleClickDisable(state)
  expect(result).toBe(state)
})
