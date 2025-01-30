import { expect, test } from '@jest/globals'
import * as HandleIconError from '../src/parts/HandleIconError/HandleIconError.ts'
import * as Icon from '../src/parts/Icon/Icon.ts'

test('returns same state if icon is already default icon', () => {
  const state = {
    iconSrc: Icon.extensionDefaultIcon(''),
    name: 'test',
    assetDir: '',
  } as any
  expect(HandleIconError.handleIconError(state)).toBe(state)
})

test('replaces icon with default icon when error occurs', () => {
  const state = {
    iconSrc: '/some/invalid/path.png',
    name: 'test',
    assetDir: '',
  } as any
  expect(HandleIconError.handleIconError(state)).toEqual({
    iconSrc: Icon.extensionDefaultIcon(''),
    name: 'test',
    assetDir: '',
  })
})

test('preserves other state properties when replacing icon', () => {
  const state = {
    iconSrc: '/some/invalid/path.png',
    name: 'test',
    description: 'test description',
    version: '1.0.0',
    assetDir: '',
  } as any
  expect(HandleIconError.handleIconError(state)).toEqual({
    iconSrc: Icon.extensionDefaultIcon(''),
    name: 'test',
    description: 'test description',
    version: '1.0.0',
    assetDir: '',
  })
})
