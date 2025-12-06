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
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Import Time: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: '150.75ms',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Activation Time: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: '0.00ms',
      type: VirtualDomElements.Text,
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
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Import Time: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: '0.00ms',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Activation Time: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: '200.50ms',
      type: VirtualDomElements.Text,
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
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Import Time: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: '100.25ms',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Activation Time: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: '300.75ms',
      type: VirtualDomElements.Text,
    },
  ]

  expect(result).toEqual(expectedDom)
})
