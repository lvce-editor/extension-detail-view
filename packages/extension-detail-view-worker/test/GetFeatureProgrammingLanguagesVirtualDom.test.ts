import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../src/parts/GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature programming languages virtual dom', () => {
  expect(GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom()).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Programming Languages'),
  ])
})
