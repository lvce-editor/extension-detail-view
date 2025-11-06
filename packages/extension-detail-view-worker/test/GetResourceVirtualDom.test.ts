import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import * as GetResourceVirtualDom from '../src/parts/GetResourceVirtualDom/GetResourceVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('resource virtual dom', () => {
  const resource: Resource = {
    label: 'Test Resource',
    url: 'https://example.com',
  }
  expect(GetResourceVirtualDom.getResourceVirtualDom(resource)).toEqual([
    {
      type: VirtualDomElements.A,
      className: 'Resource',
      childCount: 1,
      rel: 'noopener noreferrer',
      target: '_blank',
    },
    text('Test Resource'),
  ])
})
