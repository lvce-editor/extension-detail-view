import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getRuntimeStatusVirtualDom } from '../src/parts/FeatureRuntimeStatusVirtualDom/FeatureRuntimeStatusVirtualDom.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('getRuntimeStatusVirtualDom should return correct virtual DOM structure with activated status and activation time', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    status: RuntimeStatusType.Activated,
    activationTime: 150.75,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(11) // div + h1 + h1 text + p + p text + p text + p + p text + p text
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.FeatureContent,
    childCount: 3, // heading + status + activation time
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.H1,
    childCount: 1,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: ExtensionDetailStrings.runtimeStatus(),
    childCount: 0,
  })
  expect(result[3]).toEqual({
    type: VirtualDomElements.P,
    childCount: 2,
  })
  expect(result[4]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Status: ',
    childCount: 0,
  })
  expect(result[5]).toEqual({
    type: VirtualDomElements.Text,
    text: 'activated',
    childCount: 0,
  })
  expect(result[6]).toEqual({
    type: VirtualDomElements.P,
    childCount: 4,
  })
  expect(result[9]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Activation Time: ',
    childCount: 0,
  })
  expect(result[10]).toEqual({
    type: VirtualDomElements.Text,
    text: '150.75ms',
    childCount: 0,
  })
})

test('getRuntimeStatusVirtualDom should return correct virtual DOM structure with error status and no activation time', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    status: RuntimeStatusType.Error,
    activationTime: 0,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(6) // div + h1 + h1 text + p + p text + p text
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.FeatureContent,
    childCount: 2, // heading + status (no activation time)
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.H1,
    childCount: 1,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: ExtensionDetailStrings.runtimeStatus(),
    childCount: 0,
  })
  expect(result[3]).toEqual({
    type: VirtualDomElements.P,
    childCount: 2,
  })
  expect(result[4]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Status: ',
    childCount: 0,
  })
  expect(result[5]).toEqual({
    type: VirtualDomElements.Text,
    text: 'error',
    childCount: 0,
  })
})

test('getRuntimeStatusVirtualDom should handle different status types', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    status: RuntimeStatusType.Activating,
    activationTime: 0,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(6)
  expect(result[5]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Activating',
    childCount: 0,
  })
})

test('getRuntimeStatusVirtualDom should handle importing status', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    status: RuntimeStatusType.Importing,
    activationTime: 0,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(6)
  expect(result[5]).toEqual({
    type: VirtualDomElements.Text,
    text: 'importing',
    childCount: 0,
  })
})

test('getRuntimeStatusVirtualDom should handle none status', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    status: RuntimeStatusType.None,
    activationTime: 0,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(6)
  expect(result[5]).toEqual({
    type: VirtualDomElements.Text,
    text: 'none',
    childCount: 0,
  })
})

test('getRuntimeStatusVirtualDom should format activation time correctly', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    status: RuntimeStatusType.Activated,
    activationTime: 123.456,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(11)
  expect(result[8]).toEqual({
    type: VirtualDomElements.Text,
    text: '123.46ms',
    childCount: 0,
  })
})

test('getRuntimeStatusVirtualDom should handle zero activation time', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    status: RuntimeStatusType.Activated,
    activationTime: 0,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(6) // No activation time paragraph
  expect(result[0].childCount).toBe(2) // Only heading and status
})
