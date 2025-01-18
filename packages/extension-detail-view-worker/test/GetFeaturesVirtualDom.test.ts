import { expect, test } from '@jest/globals'
import * as GetFeaturesVirtualDom from '../src/parts/GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('features virtual dom', () => {
  expect(GetFeaturesVirtualDom.getFeaturesVirtualDom()).toEqual([
    {
      childCount: 2,
      className: 'Features',
      type: 4,
    },
    {
      childCount: 1,
      className: 'FeaturesList',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Feature',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Theme',
      type: 12,
    },
    text('Not Implemented'),
  ])
})
