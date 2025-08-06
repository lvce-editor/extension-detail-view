import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getStatusVirtualDom } from '../src/parts/GetStatusVirtualDom/GetStatusVirtualDom.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('getStatusVirtualDom should return correct virtual DOM structure for activated status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Activated)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
    },
    {
      type: VirtualDomElements.Text,
      text: 'Status: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
    },
    {
      type: VirtualDomElements.Text,
      text: 'activated',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for none status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.None)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
    },
    {
      type: VirtualDomElements.Text,
      text: 'Status: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
    },
    {
      type: VirtualDomElements.Text,
      text: 'none',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for activating status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Activating)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
    },
    {
      type: VirtualDomElements.Text,
      text: 'Status: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
    },
    {
      type: VirtualDomElements.Text,
      text: 'Activating',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for error status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Error)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
    },
    {
      type: VirtualDomElements.Text,
      text: 'Status: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
    },
    {
      type: VirtualDomElements.Text,
      text: 'error',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for importing status', () => {
  const result = getStatusVirtualDom(RuntimeStatusType.Importing)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
    },
    {
      type: VirtualDomElements.Text,
      text: 'Status: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
    },
    {
      type: VirtualDomElements.Text,
      text: 'importing',
      childCount: 0,
    },
  ]

  expect(result).toEqual(expectedDom)
})

test('getStatusVirtualDom should return correct virtual DOM structure for unknown status', () => {
  const result = getStatusVirtualDom(999)

  const expectedDom = [
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
    },
    {
      type: VirtualDomElements.Text,
      text: 'Status: ',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
    },
    {
      type: VirtualDomElements.Text,
      text: 'unknown',
      childCount: 0,
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
      type: VirtualDomElements.Dt,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
    })
    expect(result[1]).toEqual({
      type: VirtualDomElements.Text,
      text: 'Status: ',
      childCount: 0,
    })
    expect(result[2]).toEqual({
      type: VirtualDomElements.Dd,
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
    })
    expect(result[3].type).toBe(VirtualDomElements.Text)
    expect(result[3].childCount).toBe(0)
  }
})
