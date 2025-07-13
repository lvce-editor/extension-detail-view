import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Feature } from '../src/parts/Feature/Feature.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeatureListItemVirtualDom from '../src/parts/GetFeatureListItemVirtualDom/GetFeatureListItemVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('unselected feature', () => {
  const feature: Feature = {
    id: 'test-feature',
    label: 'Test Feature',
    selected: false,
  }
  expect(GetFeatureListItemVirtualDom.getFeatureListItemVirtualDom(feature)).toEqual([
    {
      type: VirtualDomElements.Button,
      name: 'test-feature',
      className: ClassNames.Feature,
      childCount: 1,
    },
    text('Test Feature'),
  ])
})

test('selected feature', () => {
  const feature: Feature = {
    id: 'selected-feature',
    label: 'Selected Feature',
    selected: true,
  }
  expect(GetFeatureListItemVirtualDom.getFeatureListItemVirtualDom(feature)).toEqual([
    {
      type: VirtualDomElements.Button,
      name: 'selected-feature',
      className: 'Feature FeatureSelected',
      childCount: 1,
    },
    text('Selected Feature'),
  ])
})