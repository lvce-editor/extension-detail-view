import { test, expect } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickScrollToTop } from '../src/parts/HandleClickScrollToTop/HandleClickScrollToTop.ts'

test('handleClickScrollToTop - sets readmeScrollTop to 0', () => {
  const state = {
    ...createDefaultState(),
    readmeScrollTop: 123,
  }
  const result = handleClickScrollToTop(state)
  expect(result.readmeScrollTop).toBe(0)
})

test('handleClickScrollToTop - does not modify other state', () => {
  const state = {
    ...createDefaultState(),
    readmeScrollTop: 50,
    name: 'Test',
  }
  const result = handleClickScrollToTop(state)
  expect(result.readmeScrollTop).toBe(0)
  expect(result.name).toBe('Test')
})