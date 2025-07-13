import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickSettings } from '../src/parts/HandleClickSettings/HandleClickSettings.ts'

test('handleClickSettings returns the same state', () => {
  const state = createDefaultState()
  const result = handleClickSettings(state)
  expect(result).toBe(state)
})
