import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Feature } from '../src/parts/Feature/Feature.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetFeatureListVirtualDom from '../src/parts/GetFeatureListVirtualDom/GetFeatureListVirtualDom.ts'

test('feature list is a tablist', () => {
  const features: readonly Feature[] = [
    {
      id: 'commands',
      label: 'Commands',
      selected: true,
    },
  ]
  expect(GetFeatureListVirtualDom.getFeatureListVirtualDom(features)[0]).toEqual({
    childCount: 1,
    className: ClassNames.FeaturesList,
    onClick: DomEventListenerFunctions.HandleFeaturesClick,
    role: AriaRoles.TabList,
    type: VirtualDomElements.Div,
  })
})
