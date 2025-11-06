import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffScrollTop/DiffScrollTop.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('isEqual returns true when scrollSource is User', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 0,
    selectedTab: InputName.Details,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 100,
    selectedTab: InputName.Changelog,
    scrollSource: InputSource.User,
  }
  const result: boolean = isEqual(oldState, newState)
  expect(result).toBe(true)
})

test('isEqual returns true when scrollSource is Script and readmeScrollTop and selectedTab are equal', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 50,
    selectedTab: InputName.Details,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 50,
    selectedTab: InputName.Details,
    scrollSource: InputSource.Script,
  }
  const result: boolean = isEqual(oldState, newState)
  expect(result).toBe(true)
})

test('isEqual returns false when scrollSource is Script and readmeScrollTop is different', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 0,
    selectedTab: InputName.Details,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 100,
    selectedTab: InputName.Details,
    scrollSource: InputSource.Script,
  }
  const result: boolean = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual returns false when scrollSource is Script and selectedTab is different', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 50,
    selectedTab: InputName.Details,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 50,
    selectedTab: InputName.Changelog,
    scrollSource: InputSource.Script,
  }
  const result: boolean = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual returns false when scrollSource is Script and both readmeScrollTop and selectedTab are different', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 0,
    selectedTab: InputName.Details,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 200,
    selectedTab: InputName.Changelog,
    scrollSource: InputSource.Script,
  }
  const result: boolean = isEqual(oldState, newState)
  expect(result).toBe(false)
})

test('isEqual returns true when scrollSource is User even with different readmeScrollTop and selectedTab', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 0,
    selectedTab: InputName.Details,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    readmeScrollTop: 300,
    selectedTab: InputName.Features,
    scrollSource: InputSource.User,
  }
  const result: boolean = isEqual(oldState, newState)
  expect(result).toBe(true)
})
