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
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(ExtensionDetailStrings.commands()),
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text(ExtensionDetailStrings.emptyCommandsArray()),
  ]
  expect(com).toEqual(expected)
})