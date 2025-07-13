import { test, expect } from '@jest/globals'
import { applyRender } from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('applyRender with RenderItems diff type', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState({ name: 'test-extension' })
  const diffResult = [DiffType.RenderItems]

  const commands = applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(1)
  expect(Array.isArray(commands[0])).toBe(true)
  expect(commands[0][0]).toBe('Viewlet.setDom2')
})

test('applyRender with RenderFocus diff type', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState({ selectedFeature: 'test-feature' })
  const diffResult = [DiffType.RenderFocus]

  const commands = applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(1)
  expect(Array.isArray(commands[0])).toBe(true)
  expect(commands[0][0]).toBe('Viewlet.focusElementByName')
})

test('applyRender with RenderScrollTop diff type', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState({ readmeScrollTop: 100 })
  const diffResult = [DiffType.RenderScrollTop]

  const commands = applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(1)
  expect(Array.isArray(commands[0])).toBe(true)
  expect(commands[0][0]).toBe('Viewlet.setScrollTop')
})

test('applyRender with multiple diff types', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState({
    name: 'test-extension',
    selectedFeature: 'test-feature',
    readmeScrollTop: 100
  })
  const diffResult = [DiffType.RenderItems, DiffType.RenderFocus, DiffType.RenderScrollTop]

  const commands = applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(3)
  commands.forEach(command => {
    expect(Array.isArray(command)).toBe(true)
  })
  expect(commands[0][0]).toBe('Viewlet.setDom2')
  expect(commands[1][0]).toBe('Viewlet.focusElementByName')
  expect(commands[2][0]).toBe('Viewlet.setScrollTop')
})

test('applyRender with empty diff result', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult: readonly number[] = []

  const commands = applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(0)
})

test('applyRender throws error for unknown diff type', () => {
  const oldState = createDefaultState()
  const newState = createDefaultState()
  const diffResult = [999] // Unknown diff type

  expect(() => {
    applyRender(oldState, newState, diffResult)
  }).toThrow('unknown renderer')
})