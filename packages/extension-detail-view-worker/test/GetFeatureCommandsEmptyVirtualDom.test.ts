import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getFeatureCommandsEmptyVirtualDom } from '../src/parts/GetFeatureCommandsEmptyVirtualDom/GetFeatureCommandsEmptyVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getFeatureCommandsEmptyVirtualDom returns expected structure', () => {
  const com = getFeatureCommandsEmptyVirtualDom()
  const expected = [
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text(ExtensionDetailStrings.commands()),
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text(ExtensionDetailStrings.emptyCommandsArray()),
  ]
  expect(com).toEqual(expected)
})
