import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getFeaturesEmptyVirtualDom } from '../src/parts/GetFeaturesEmptyVirtualDom/GetFeaturesEmptyVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getFeaturesEmptyVirtualDom returns expected structure', () => {
  const result = getFeaturesEmptyVirtualDom()
  const expected = [
    {
      childCount: 1,
      className: ClassNames.Features,
      type: VirtualDomElements.Div,
    },
    text(ExtensionDetailStrings.none()),
  ]
  expect(result).toEqual(expected)
})
