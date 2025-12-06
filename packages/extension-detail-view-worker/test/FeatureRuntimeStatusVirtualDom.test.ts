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
    activationTime: 150.75,
    status: RuntimeStatusType.Activated,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(16) // div + h1 + h1 text + dl + dt + dt text + dd + dd text + dt + dt text + dd + dd text + dt + dt text + dd + dd text
  expect(result[0]).toEqual({
    childCount: 2,
    className: ClassNames.FeatureContent,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.H1,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    text: ExtensionDetailStrings.runtimeStatus(),
    type: VirtualDomElements.Text,
  })
  expect(result[3]).toEqual({
    childCount: 6,
    className: 'RuntimeStatusDefinitionList',
    type: VirtualDomElements.Dl,
  })
  expect(result[4]).toEqual({
    childCount: 1,
    className: 'RuntimeStatusDefinitionListKey',
    type: VirtualDomElements.Dt,
  })
  expect(result[5]).toEqual({
    childCount: 0,
    text: 'Status: ',
    type: VirtualDomElements.Text,
  })
  expect(result[6]).toEqual({
    childCount: 1,
    className: 'RuntimeStatusDefinitionListValue',
    type: VirtualDomElements.Dd,
  })
  expect(result[7]).toEqual({
    childCount: 0,
    text: 'activated',
    type: VirtualDomElements.Text,
  })
  expect(result[8]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Dt,
  })
  expect(result[9]).toEqual({
    childCount: 0,
    text: 'Import Time: ',
    type: VirtualDomElements.Text,
  })
  expect(result[10]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Dd,
  })
  expect(result[11]).toEqual({
    childCount: 0,
    text: '150.75ms',
    type: VirtualDomElements.Text,
  })
  expect(result[12]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Dt,
  })
  expect(result[13]).toEqual({
    childCount: 0,
    text: 'Activation Time: ',
    type: VirtualDomElements.Text,
  })
  expect(result[14]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Dd,
  })
  expect(result[15]).toEqual({
    childCount: 0,
    text: '0.00ms',
    type: VirtualDomElements.Text,
  })
})

test('getRuntimeStatusVirtualDom should return correct virtual DOM structure with error status and no activation time', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    activationTime: 0,
    status: RuntimeStatusType.Error,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(8) // div + h1 + h1 text + dl + dt + dt text + dd + dd text
  expect(result[0]).toEqual({
    childCount: 2, // heading + dl
    className: ClassNames.FeatureContent,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.H1,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    text: ExtensionDetailStrings.runtimeStatus(),
    type: VirtualDomElements.Text,
  })
  expect(result[3]).toEqual({
    childCount: 2,
    className: 'RuntimeStatusDefinitionList',
    type: VirtualDomElements.Dl,
  })
  expect(result[4]).toEqual({
    childCount: 1,
    className: 'RuntimeStatusDefinitionListKey',
    type: VirtualDomElements.Dt,
  })
  expect(result[5]).toEqual({
    childCount: 0,
    text: 'Status: ',
    type: VirtualDomElements.Text,
  })
  expect(result[6]).toEqual({
    childCount: 1,
    className: 'RuntimeStatusDefinitionListValue',
    type: VirtualDomElements.Dd,
  })
  expect(result[7]).toEqual({
    childCount: 0,
    text: 'error',
    type: VirtualDomElements.Text,
  })
})

test('getRuntimeStatusVirtualDom should handle different status types', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    activationTime: 0,
    status: RuntimeStatusType.Activating,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(8)
  expect(result[7]).toEqual({
    childCount: 0,
    text: 'Activating',
    type: VirtualDomElements.Text,
  })
})

test('getRuntimeStatusVirtualDom should handle importing status', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    activationTime: 0,
    status: RuntimeStatusType.Importing,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(8)
  expect(result[7]).toEqual({
    childCount: 0,
    text: 'importing',
    type: VirtualDomElements.Text,
  })
})

test('getRuntimeStatusVirtualDom should handle none status', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    activationTime: 0,
    status: RuntimeStatusType.None,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(8)
  expect(result[7]).toEqual({
    childCount: 0,
    text: 'none',
    type: VirtualDomElements.Text,
  })
})

test('getRuntimeStatusVirtualDom should format activation time correctly', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    activationTime: 123.456,
    status: RuntimeStatusType.Activated,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(16)
  expect(result[15]).toEqual({
    childCount: 0,
    text: '0.00ms',
    type: VirtualDomElements.Text,
  })
})

test('getRuntimeStatusVirtualDom should handle zero activation time', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    activationTime: 0,
    status: RuntimeStatusType.Activated,
  }

  const result = getRuntimeStatusVirtualDom(state)

  expect(result).toHaveLength(8) // No activation time entries
  expect(result[0].childCount).toBe(2) // Only heading and dl
})
