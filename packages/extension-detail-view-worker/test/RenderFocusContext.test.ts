import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderFocusContext from '../src/parts/RenderFocusContext/RenderFocusContext.ts'

test('renderFocusContext - returns focus element by name command when focus is not 451', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = CreateDefaultState.createDefaultState()

  const result: readonly any[] = RenderFocusContext.renderFocusContext(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocusContext - returns set focus context command when focus is 451', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 451,
    uid: 123,
  }

  const result: readonly any[] = RenderFocusContext.renderFocusContext(oldState, newState)

  expect(result).toEqual(['Viewlet.setFocusContext', 123, 451])
})

test('renderFocusContext - with different uid values', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 451,
    uid: 456,
  }

  const result: readonly any[] = RenderFocusContext.renderFocusContext(oldState, newState)

  expect(result).toEqual(['Viewlet.setFocusContext', 456, 451])
})

test('renderFocusContext - with different focus values not equal to 451', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 100,
    uid: 789,
  }

  const result: readonly any[] = RenderFocusContext.renderFocusContext(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocusContext - with focus 0', () => {
  const oldState: ExtensionDetailState = CreateDefaultState.createDefaultState()
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    focus: 0,
    uid: 999,
  }

  const result: readonly any[] = RenderFocusContext.renderFocusContext(oldState, newState)

  expect(result).toEqual(['Viewlet.focusElementByName', ''])
})

test('renderFocusContext - with complex states', () => {
  const oldState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    extensionId: 'test-extension',
    name: 'Test Extension',
  }
  const newState: ExtensionDetailState = {
    ...CreateDefaultState.createDefaultState(),
    extensionId: 'test-extension',
    focus: 451,
    name: 'Test Extension',
    uid: 111,
  }

  const result: readonly any[] = RenderFocusContext.renderFocusContext(oldState, newState)

  expect(result).toEqual(['Viewlet.setFocusContext', 111, 451])
})
