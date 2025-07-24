import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getActivationTimeVirtualDom } from '../src/parts/GetActivationTimeVirtualDom/GetActivationTimeVirtualDom.ts'

test('getActivationTimeVirtualDom should return empty array when both times are zero', () => {
  const result = getActivationTimeVirtualDom(0, 0)

  expect(result).toHaveLength(0)
})

test('getActivationTimeVirtualDom should return correct virtual DOM structure when only import time is provided', () => {
  const importTime = 150.75
  const activationTime = 0
  const result = getActivationTimeVirtualDom(importTime, activationTime)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Import Time: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '150.75ms',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Activation Time: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '0.00ms',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getActivationTimeVirtualDom should return correct virtual DOM structure when only activation time is provided', () => {
  const importTime = 0
  const activationTime = 200.5
  const result = getActivationTimeVirtualDom(importTime, activationTime)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Import Time: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '0.00ms',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Activation Time: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '200.50ms',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getActivationTimeVirtualDom should return correct virtual DOM structure when both times are provided', () => {
  const importTime = 100.25
  const activationTime = 300.75
  const result = getActivationTimeVirtualDom(importTime, activationTime)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Import Time: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '100.25ms',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Activation Time: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: '300.75ms',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})
