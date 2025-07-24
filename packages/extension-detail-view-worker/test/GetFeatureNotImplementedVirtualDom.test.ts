import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetFeatureNotImplementedVirtualDom from '../src/parts/GetFeatureNotImplementedVirtualDom/GetFeatureNotImplementedVirtualDom.ts'
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
    text('Not Implemented'),
  ])
})
