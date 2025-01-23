import { expect, test } from '@jest/globals'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import * as GetResourceVirtualDom from '../src/parts/GetResourceVirtualDom/GetResourceVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('resource virtual dom', () => {
  const resource: Resource = {
    label: 'Test Resource',
    url: 'https://test.com',
  }
  expect(GetResourceVirtualDom.getResourceVirtualDom(resource)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Resource',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: 'ResourceName',
      childCount: 1,
    },
    text('Test Resource'),
    {
      type: VirtualDomElements.Div,
      className: 'ResourcePath',
      childCount: 1,
    },
    text('https://test.com'),
  ])
})

test('handles empty resource', () => {
  const resource: Resource = {
    label: '',
    url: '',
  }
  expect(GetResourceVirtualDom.getResourceVirtualDom(resource)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Resource',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: 'ResourceName',
      childCount: 1,
    },
    text(''),
    {
      type: VirtualDomElements.Div,
      className: 'ResourcePath',
      childCount: 1,
    },
    text(''),
  ])
})
