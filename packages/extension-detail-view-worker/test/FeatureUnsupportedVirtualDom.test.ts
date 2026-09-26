import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getFeatureUnsupportedVirtualDom } from '../src/parts/FeatureUnsupportedVirtualDom/FeatureUnsupportedVirtualDom.ts'

test('feature unsupported virtual dom includes the feature content heading class', () => {
  const result = getFeatureUnsupportedVirtualDom(createDefaultState())

  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.FeatureContentHeading,
    type: VirtualDomElements.H1,
  })
})
