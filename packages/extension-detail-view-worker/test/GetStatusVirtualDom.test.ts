import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getStatusVirtualDom } from '../src/parts/GetStatusVirtualDom/GetStatusVirtualDom.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('getStatusVirtualDom should return correct virtual DOM structure for activated status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Activated)

  const expectedDom = [
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Status: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: 'activated',
      type: VirtualDomElements.Text,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for none status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.None)

  const expectedDom = [
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Status: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: 'none',
      type: VirtualDomElements.Text,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for activating status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Activating)

  const expectedDom = [
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Status: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: 'Activating',
      type: VirtualDomElements.Text,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for error status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Error)

  const expectedDom = [
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Status: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: 'error',
      type: VirtualDomElements.Text,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for importing status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Importing)

  const expectedDom = [
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Status: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: 'importing',
      type: VirtualDomElements.Text,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for unknown status', () => {
  const result = getStatusVirtualDom(999)

  const expectedDom = [
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Status: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: 'unknown',
      type: VirtualDomElements.Text,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should always return consistent structure regardless of status', () => {
  const statuses = [
    RuntimeStatusType.None,
    RuntimeStatusType.Importing,
    RuntimeStatusType.Activating,
    RuntimeStatusType.Activated,
    RuntimeStatusType.Error,
    999, // unknown status
  ]

  for (const status of statuses) {
    const result = getStatusVirtualDom(status)

    expect(result).toHaveLength(4)
    expect(result[0]).toEqual({
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    })
    expect(result[1]).toEqual({
      childCount: 0,
      text: 'Status: ',
      type: VirtualDomElements.Text,
    })
    expect(result[2]).toEqual({
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    })
    expect(result[3].type).toBe(VirtualDomElements.Text)
    expect(result[3].childCount).toBe(0)
  }
})
