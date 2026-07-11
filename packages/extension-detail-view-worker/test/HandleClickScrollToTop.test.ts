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
    name: 'Test',
    readmeScrollTop: 50,
  }
  const result = handleClickScrollToTop(state)
  expect(result.readmeScrollTop).toBe(0)
  expect(result.name).toBe('Test')
})

test('handleClickScrollToTop - sets changelogScrollTop to 0', () => {
  const state = {
    ...createDefaultState(),
    changelogScrollTop: 123,
    readmeScrollTop: 50,
    selectedTab: 'Changelog',
  }
  const result = handleClickScrollToTop(state)
  expect(result.changelogScrollTop).toBe(0)
  expect(result.readmeScrollTop).toBe(50)
})

test('handleClickScrollToTop - returns unchanged state when changelog is already at top', () => {
  const state = {
    ...createDefaultState(),
    changelogScrollTop: 0,
    selectedTab: 'Changelog',
  }
  expect(handleClickScrollToTop(state)).toBe(state)
})
