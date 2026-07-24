import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import * as GetResourceVirtualDom from '../src/parts/GetResourceVirtualDom/GetResourceVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('resource virtual dom', () => {
  const resource: Resource = {
    icon: '',
    label: 'Test Resource',
    url: 'https://example.com',
  }
  expect(GetResourceVirtualDom.getResourceVirtualDom(resource)).toEqual([
    {
      childCount: 1,
      className: 'Resource',
      href: 'https://example.com',
      onClick: 19,
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('Test Resource'),
  ])
})

test('resource virtual dom with an icon', () => {
  const resource: Resource = {
    icon: 'Github',
    label: 'Repository',
    url: 'https://github.com/example/repository',
  }
  expect(GetResourceVirtualDom.getResourceVirtualDom(resource)).toEqual([
    {
      childCount: 2,
      className: 'Resource',
      href: 'https://github.com/example/repository',
      onClick: 19,
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    {
      childCount: 1,
      className: 'ResourceIcon',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconGithub',
      type: VirtualDomElements.Div,
    },
    text('Repository'),
  ])
})
