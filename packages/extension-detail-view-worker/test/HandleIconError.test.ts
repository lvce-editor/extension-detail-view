import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleIconError from '../src/parts/HandleIconError/HandleIconError.ts'
import * as Icon from '../src/parts/Icon/Icon.ts'

test('returns same state if icon is already default icon', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    iconSrc: Icon.extensionDefaultIcon(CreateDefaultState.createDefaultState().assetDir),
  }
  expect(HandleIconError.handleIconError(state)).toBe(state)
})

test('replaces icon with default icon when error occurs', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    iconSrc: '/some/invalid/path.png',
  }
  expect(HandleIconError.handleIconError(state)).toEqual({
    ...state,
    iconSrc: Icon.extensionDefaultIcon(state.assetDir),
  })
})

test('preserves other state properties when replacing icon', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    iconSrc: '/some/invalid/path.png',
    name: 'test',
    description: 'test description',
  }
  expect(HandleIconError.handleIconError(state)).toEqual({
    ...state,
    iconSrc: Icon.extensionDefaultIcon(state.assetDir),
  })
})
