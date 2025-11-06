import { expect, test } from '@jest/globals'
import type { Dimensions } from '../src/parts/Dimensions/Dimensions.ts'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { resize } from '../src/parts/Resize/Resize.ts'

test('resize merges dimensions into state', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions: Dimensions = { x: 10, y: 20, width: 800, height: 600 }
  const result: ExtensionDetailState = resize(state, dimensions)

  expect(result.width).toBe(800)
})

test('resize preserves other state properties', () => {
  const state: ExtensionDetailState = { ...createDefaultState(), name: 'test-extension', extensionId: 'test-id' }
  const dimensions = { x: 0, y: 0, width: 1000, height: 800 }
  const result: ExtensionDetailState = resize(state, dimensions)

  expect(result.name).toBe('test-extension')
  expect(result.extensionId).toBe('test-id')
  expect(result.width).toBe(1000)
})

test('resize calculates padding correctly for width below 600', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions = { x: 0, y: 0, width: 500, height: 400 }
  const result: ExtensionDetailState = resize(state, dimensions)

  expect(result.paddingLeft).toBe(10)
  expect(result.paddingRight).toBe(10)
})

test('resize calculates padding correctly for width 600-799', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions600 = { x: 0, y: 0, width: 600, height: 400 }
  const dimensions799 = { x: 0, y: 0, width: 799, height: 400 }
  const result600: ExtensionDetailState = resize(state, dimensions600)
  const result799: ExtensionDetailState = resize(state, dimensions799)

  expect(result600.paddingLeft).toBe(10)
  expect(result600.paddingRight).toBe(10)
  expect(result799.paddingLeft).toBe(10)
  expect(result799.paddingRight).toBe(10)
})

test('resize calculates padding correctly for width 800-1199', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions800 = { x: 0, y: 0, width: 800, height: 400 }
  const dimensions1000 = { x: 0, y: 0, width: 1000, height: 400 }
  const dimensions1199 = { x: 0, y: 0, width: 1199, height: 400 }
  const result800: ExtensionDetailState = resize(state, dimensions800)
  const result1000: ExtensionDetailState = resize(state, dimensions1000)
  const result1199: ExtensionDetailState = resize(state, dimensions1199)

  expect(result800.paddingLeft).toBe(10)
  expect(result800.paddingRight).toBe(10)
  expect(result1000.paddingLeft).toBe(20)
  expect(result1000.paddingRight).toBe(20)
  expect(result1199.paddingLeft).toBe(30)
  expect(result1199.paddingRight).toBe(30)
})

test('resize calculates padding correctly for width 1200 and above', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions1200 = { x: 0, y: 0, width: 1200, height: 400 }
  const dimensions1600 = { x: 0, y: 0, width: 1600, height: 400 }
  const result1200: ExtensionDetailState = resize(state, dimensions1200)
  const result1600: ExtensionDetailState = resize(state, dimensions1600)

  expect(result1200.paddingLeft).toBe(30)
  expect(result1200.paddingRight).toBe(30)
  expect(result1600.paddingLeft).toBe(30)
  expect(result1600.paddingRight).toBe(30)
})

test('resize sets showSideBar to false when width is below 490', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions = { x: 0, y: 0, width: 489, height: 400 }
  const result: ExtensionDetailState = resize(state, dimensions)

  expect(result.showSideBar).toBe(false)
  expect(result.sideBarWidth).toBe(0)
})

test('resize sets showSideBar to true when width is 490 or above', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions490 = { x: 0, y: 0, width: 490, height: 400 }
  const dimensions500 = { x: 0, y: 0, width: 500, height: 400 }
  const dimensions800 = { x: 0, y: 0, width: 800, height: 400 }
  const result490: ExtensionDetailState = resize(state, dimensions490)
  const result500: ExtensionDetailState = resize(state, dimensions500)
  const result800: ExtensionDetailState = resize(state, dimensions800)

  expect(result490.showSideBar).toBe(true)
  expect(result490.sideBarWidth).toBeGreaterThan(0)
  expect(result500.showSideBar).toBe(true)
  expect(result500.sideBarWidth).toBeGreaterThan(0)
  expect(result800.showSideBar).toBe(true)
  expect(result800.sideBarWidth).toBeGreaterThan(0)
})

test('resize calculates sideBarWidth correctly', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions500 = { x: 0, y: 0, width: 500, height: 400 }
  const dimensions1000 = { x: 0, y: 0, width: 1000, height: 400 }
  const result500: ExtensionDetailState = resize(state, dimensions500)
  const result1000: ExtensionDetailState = resize(state, dimensions1000)

  const expected500: number = Math.max(175 + Math.round(20 * (500 / 100)), Math.round(500 / 4))
  const expected1000: number = Math.max(175 + Math.round(20 * (1000 / 100)), Math.round(1000 / 4))

  expect(result500.sideBarWidth).toBe(expected500)
  expect(result1000.sideBarWidth).toBe(expected1000)
  expect(result1000.sideBarWidth).toBeGreaterThan(result500.sideBarWidth)
})

test('resize sets paddingLeft and paddingRight to the same value', () => {
  const state: ExtensionDetailState = createDefaultState()
  const dimensions = { x: 0, y: 0, width: 1000, height: 400 }
  const result: ExtensionDetailState = resize(state, dimensions)

  expect(result.paddingLeft).toBe(result.paddingRight)
})
