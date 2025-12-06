import { expect, test } from '@jest/globals'
import type { RestoredState } from '../src/parts/RestoredState/RestoredState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RestoreState from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState - valid saved state', () => {
  const savedState: unknown = {
    selectedFeature: 'Commands',
    selectedTab: 'Features',
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    changelogScrollTop: 0,
    readmeScrollTop: 0,
    selectedFeature: 'Commands',
    selectedTab: 'Features',
  })
})

test('restoreState - invalid saved state', () => {
  const savedState: unknown = {
    selectedFeature: null,
    selectedTab: 123,
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    changelogScrollTop: 0,
    readmeScrollTop: 0,
    selectedFeature: InputName.Details,
    selectedTab: InputName.Details,
  })
})

test('restoreState - null saved state', () => {
  const result: RestoredState = RestoreState.restoreState(null)
  expect(result).toEqual({
    changelogScrollTop: 0,
    readmeScrollTop: 0,
    selectedFeature: InputName.Details,
    selectedTab: InputName.Details,
  })
})

test('restoreState - undefined saved state', () => {
  const result: RestoredState = RestoreState.restoreState(undefined)
  expect(result).toEqual({
    changelogScrollTop: 0,
    readmeScrollTop: 0,
    selectedFeature: InputName.Details,
    selectedTab: InputName.Details,
  })
})

test('restoreState - partial saved state', () => {
  const savedState: unknown = {
    selectedTab: 'Settings',
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    changelogScrollTop: 0,
    readmeScrollTop: 0,
    selectedFeature: InputName.Details,
    selectedTab: 'Settings',
  })
})

test('restoreState - empty object', () => {
  const savedState: unknown = {}
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    changelogScrollTop: 0,
    readmeScrollTop: 0,
    selectedFeature: InputName.Details,
    selectedTab: InputName.Details,
  })
})

test('restoreState - non-object saved state', () => {
  const savedState: unknown = 'not an object'
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    changelogScrollTop: 0,
    readmeScrollTop: 0,
    selectedFeature: InputName.Details,
    selectedTab: InputName.Details,
  })
})
