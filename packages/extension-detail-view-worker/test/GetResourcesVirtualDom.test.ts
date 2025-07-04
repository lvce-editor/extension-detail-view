import { expect, test } from '@jest/globals'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetResourcesVirtualDom from '../src/parts/GetResourcesVirtualDom/GetResourcesVirtualDom.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

test('resources virtual dom with empty resources', () => {
  const resources: readonly Resource[] = []
  expect(GetResourcesVirtualDom.getResourcesVirtualDom(resources)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Resources,
      childCount: 0,
    },
  ])
})
