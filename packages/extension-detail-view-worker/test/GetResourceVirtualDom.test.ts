import { expect, test } from '@jest/globals'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import * as GetResourceVirtualDom from '../src/parts/GetResourceVirtualDom/GetResourceVirtualDom.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
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
      childCount: 1,
    },
    text('Test Resource'),
  ])
})
