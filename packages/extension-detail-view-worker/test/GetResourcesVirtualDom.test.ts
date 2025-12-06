import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../src/parts/Resource/Resource.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetResourcesVirtualDom from '../src/parts/GetResourcesVirtualDom/GetResourcesVirtualDom.ts'

test('resources virtual dom with empty resources', () => {
  const resources: readonly Resource[] = []
  expect(GetResourcesVirtualDom.getResourcesVirtualDom(resources)).toEqual([
    {
      childCount: 0,
      className: ClassNames.Resources,
      type: VirtualDomElements.Div,
    },
  ])
})
