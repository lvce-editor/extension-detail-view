import { expect, test } from '@jest/globals'
import type { RestoredState } from '../src/parts/RestoredState/RestoredState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RestoreState from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState - valid saved state', () => {
  const savedState: unknown = {
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: 'Features',
    selectedFeature: 'Commands',
    readmeScrollTop: 0,
  })
})

test('restoreState - invalid saved state', () => {
  const savedState: unknown = {
    selectedTab: 123,
    selectedFeature: null,
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
    readmeScrollTop: 0,
  })
})

test('restoreState - null saved state', () => {
  const result: RestoredState = RestoreState.restoreState(null)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
    readmeScrollTop: 0,
  })
})

test('restoreState - undefined saved state', () => {
  const result: RestoredState = RestoreState.restoreState(undefined)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
    readmeScrollTop: 0,
  })
})

test('restoreState - partial saved state', () => {
  const savedState: unknown = {
    selectedTab: 'Settings',
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: 'Settings',
    selectedFeature: InputName.Details,
    readmeScrollTop: 0,
  })
})

test('restoreState - empty object', () => {
  const savedState: unknown = {}
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
    readmeScrollTop: 0,
  })
})

test('restoreState - non-object saved state', () => {
  const savedState: unknown = 'not an object'
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
    readmeScrollTop: 0,
  })
})
