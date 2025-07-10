import { expect, test } from '@jest/globals'
import * as DiffItems from '../src/parts/DiffItems/DiffItems.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('diffType should be RenderItems', () => {
  expect(DiffItems.diffType).toBe(DiffType.RenderItems)
})

test('isEqual - same state reference', () => {
  const state = { selectedTab: 'Features', selectedFeature: 'Commands' } as any
  const result = DiffItems.isEqual(state, state)
  expect(result).toBe(true)
})

test('isEqual - different state references with same content', () => {
  const oldState = { selectedTab: 'Features', selectedFeature: 'Commands' } as any
  const newState = { selectedTab: 'Features', selectedFeature: 'Commands' } as any
  const result = DiffItems.isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual - different state content', () => {
  const oldState = { selectedTab: 'Features', selectedFeature: 'Commands' } as any
  const newState = { selectedTab: 'Settings', selectedFeature: 'Commands' } as any
  const result = DiffItems.isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual - null states', () => {
  const result = DiffItems.isEqual(null as any, null as any)
  expect(result).toBe(true)
})

test('isEqual - one null state', () => {
  const state = { selectedTab: 'Features' } as any
  const result1 = DiffItems.isEqual(null as any, state)
  const result2 = DiffItems.isEqual(state, null as any)
  expect(result1).toBe(false)
  expect(result2).toBe(false)
})
