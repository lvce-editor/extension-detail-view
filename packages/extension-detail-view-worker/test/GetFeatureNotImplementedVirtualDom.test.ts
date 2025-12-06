import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetFeatureNotImplementedVirtualDom from '../src/parts/GetFeatureNotImplementedVirtualDom/GetFeatureNotImplementedVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature not implemented virtual dom', () => {
  expect(GetFeatureNotImplementedVirtualDom.getFeatureNotImplementedVirtualDom()).toEqual([
    {
      childCount: 1,
      className: 'FeatureContent',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text('Not Implemented'),
  ])
})
