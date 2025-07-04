import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetResourcesVirtualDom from '../src/parts/GetResourcesVirtualDom/GetResourcesVirtualDom.ts'

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
