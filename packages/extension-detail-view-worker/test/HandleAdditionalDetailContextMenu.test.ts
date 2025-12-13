import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleAdditionalDetailContextMenu } from '../src/parts/HandleAdditionalDetailContextMenu/HandleAdditionalDetailContextMenu.ts'

test.skip('handleAdditionalDetailContextMenu returns the same state', async () => {
  const state = createDefaultState()
  const result = await handleAdditionalDetailContextMenu(state, 0, 0, '', '')
  expect(result).toBe(state)
})
