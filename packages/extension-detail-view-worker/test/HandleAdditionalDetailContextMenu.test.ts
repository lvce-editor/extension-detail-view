import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleAdditionalDetailContextMenu } from '../src/parts/HandleAdditionalDetailContextMenu/HandleAdditionalDetailContextMenu.ts'

test('handleAdditionalDetailContextMenu returns the same state', () => {
  const state = createDefaultState()
  const result = handleAdditionalDetailContextMenu(state)
  expect(result).toBe(state)
})
