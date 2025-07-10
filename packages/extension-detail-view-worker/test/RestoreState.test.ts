import { expect, test } from '@jest/globals'
import * as RestoreState from '../src/parts/RestoreState/RestoreState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import type { RestoredState } from '../src/parts/RestoredState/RestoredState.ts'

test('restoreState - valid saved state', () => {
  const savedState = {
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: 'Features',
    selectedFeature: 'Commands',
  })
})

test('restoreState - invalid saved state', () => {
  const savedState = {
    selectedTab: 123,
    selectedFeature: null,
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
  })
})

test('restoreState - null saved state', () => {
  const result: RestoredState = RestoreState.restoreState(null)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
  })
})

test('restoreState - undefined saved state', () => {
  const result: RestoredState = RestoreState.restoreState(undefined)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
  })
})

test('restoreState - partial saved state', () => {
  const savedState = {
    selectedTab: 'Settings',
  }
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: 'Settings',
    selectedFeature: InputName.Details,
  })
})

test('restoreState - empty object', () => {
  const savedState = {}
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
  })
})

test('restoreState - non-object saved state', () => {
  const savedState = 'not an object'
  const result: RestoredState = RestoreState.restoreState(savedState)
  expect(result).toEqual({
    selectedTab: InputName.Details,
    selectedFeature: InputName.Details,
  })
})