import { test, expect } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { renderScrollTop } from '../src/parts/RenderScrollTop/RenderScrollTop.ts'

test('should return readme scroll top when selected tab is Details', () => {
  const oldState: ExtensionDetailState = createDefaultState()
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: InputName.Details,
    readmeScrollTop: 100,
    changelogScrollTop: 200,
    uid: 123,
  }

  const result = renderScrollTop(oldState, newState)

  expect(result).toEqual(['Viewlet.setProperty', 123, '.ExtensionDetailPanel .Markdown', 'scrollTop', 100])
})

test('should return changelog scroll top when selected tab is Changelog', () => {
  const oldState: ExtensionDetailState = createDefaultState()
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: InputName.Changelog,
    readmeScrollTop: 100,
    changelogScrollTop: 200,
    uid: 456,
  }

  const result = renderScrollTop(oldState, newState)

  expect(result).toEqual(['Viewlet.setProperty', 456, '.ExtensionDetailPanel .Markdown', 'scrollTop', 200])
})

test('should return empty array when selected tab is not Details or Changelog', () => {
  const oldState: ExtensionDetailState = createDefaultState()
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: InputName.Features,
    readmeScrollTop: 100,
    changelogScrollTop: 200,
    uid: 789,
  }

  const result = renderScrollTop(oldState, newState)

  expect(result).toEqual([])
})

test('should return empty array when selected tab is empty string', () => {
  const oldState: ExtensionDetailState = createDefaultState()
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: '',
    readmeScrollTop: 100,
    changelogScrollTop: 200,
    uid: 999,
  }

  const result = renderScrollTop(oldState, newState)

  expect(result).toEqual([])
})

test('should handle zero scroll top values', () => {
  const oldState: ExtensionDetailState = createDefaultState()
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: InputName.Details,
    readmeScrollTop: 0,
    changelogScrollTop: 0,
    uid: 111,
  }

  const result = renderScrollTop(oldState, newState)

  expect(result).toEqual(['Viewlet.setProperty', 111, '.ExtensionDetailPanel .Markdown', 'scrollTop', 0])
})
