import { expect, test } from '@jest/globals'
import * as GetSavedSelectedTab from '../src/parts/GetSavedSelectedTab/GetSavedSelectedTab.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('returns saved selected tab', () => {
  const savedState = {
    selectedTab: 'Features',
  }
  expect(GetSavedSelectedTab.getSavedSelectedTab(savedState)).toBe('Features')
})

test('returns default tab when saved state is undefined', () => {
  expect(GetSavedSelectedTab.getSavedSelectedTab(undefined)).toBe(InputName.Details)
})

test('returns default tab when saved state is null', () => {
  expect(GetSavedSelectedTab.getSavedSelectedTab(null)).toBe(InputName.Details)
})

test('returns default tab when saved state is not an object', () => {
  expect(GetSavedSelectedTab.getSavedSelectedTab('not an object')).toBe(InputName.Details)
})

test('returns default tab when selectedTab is missing', () => {
  const savedState = {
    otherProperty: 'value',
  }
  expect(GetSavedSelectedTab.getSavedSelectedTab(savedState)).toBe(InputName.Details)
})

test('returns default tab when selectedTab is not a string', () => {
  const savedState = {
    selectedTab: 123,
  }
  expect(GetSavedSelectedTab.getSavedSelectedTab(savedState)).toBe(InputName.Details)
})
