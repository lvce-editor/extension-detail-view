import { test, expect } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('applyRender with RenderItems diff type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), name: 'test-extension' }
  const diffResult = [DiffType.RenderItems]

  const commands = ApplyRender.applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(1)
  expect(Array.isArray(commands[0])).toBe(true)
  expect(commands[0][0]).toBe('Viewlet.setDom2')
})

test('applyRender with RenderFocus diff type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), selectedFeature: 'test-feature' }
  const diffResult = [DiffType.RenderFocus]

  const commands = ApplyRender.applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(1)
  expect(Array.isArray(commands[0])).toBe(true)
  expect(commands[0][0]).toBe('Viewlet.focusElementByName')
})

test.skip('applyRender with RenderScrollTop diff type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = { ...CreateDefaultState.createDefaultState(), readmeScrollTop: 100 }
  const diffResult = [DiffType.RenderScrollTop]

  const commands = ApplyRender.applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(1)
  expect(Array.isArray(commands[0])).toBe(true)
  expect(commands[0][0]).toBe('Viewlet.setProperty')
})

test('applyRender with empty diff result', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult: readonly number[] = []

  const commands = ApplyRender.applyRender(oldState, newState, diffResult)

  expect(commands).toHaveLength(0)
})

test('applyRender throws error for unknown diff type', () => {
  const oldState = CreateDefaultState.createDefaultState()
  const newState = CreateDefaultState.createDefaultState()
  const diffResult = [999] // Unknown diff type

  expect(() => {
    ApplyRender.applyRender(oldState, newState, diffResult)
  }).toThrow('unknown renderer')
})
