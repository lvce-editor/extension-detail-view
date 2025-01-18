import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeaturesVirtualDom from '../src/parts/GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('features virtual dom', () => {
  expect(GetFeaturesVirtualDom.getFeaturesVirtualDom()).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 1,
    },
    text('Not Implemented'),
  ])
})
