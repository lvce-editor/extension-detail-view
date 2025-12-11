import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSelectionChange } from '../src/parts/HandleSelectionChange/HandleSelectionChange.ts'

test('handleSelectionChange - returns the same state', async () => {
  const state = createDefaultState()
  const selection = {}
  const result = await handleSelectionChange(state, selection)
  expect(result).toBe(state)
})

test('handleSelectionChange - returns state unchanged regardless of selection', async () => {
  const state = {
    ...createDefaultState(),
    name: 'Test Extension',
    readmeScrollTop: 100,
  }
  const selection = { end: 10, start: 0 }
  const result = await handleSelectionChange(state, selection)
  expect(result).toBe(state)
  expect(result.name).toBe('Test Extension')
  expect(result.readmeScrollTop).toBe(100)
})
