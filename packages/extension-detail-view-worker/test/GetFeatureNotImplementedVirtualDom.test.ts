import { expect, test } from '@jest/globals'
import * as GetFeatureNotImplementedVirtualDom from '../src/parts/GetFeatureNotImplementedVirtualDom/GetFeatureNotImplementedVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature not implemented virtual dom', () => {
  expect(GetFeatureNotImplementedVirtualDom.getFeatureNotImplementedVirtualDom()).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'FeatureContent',
      childCount: 1,
    },
    {
      type: 5,
      childCount: 1,
    },
    text('Not implemented'),
  ])
})
