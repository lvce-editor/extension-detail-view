import { expect, test } from '@jest/globals'
import type { Feature } from '../src/parts/Feature/Feature.ts'
import * as GetFeaturesVirtualDom from '../src/parts/GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'

test('features virtual dom', () => {
  const themesHtml = ''
  const features: readonly Feature[] = [
    {
      id: 'theme',
      label: 'Theme',
      selected: true,
    },
  ]
  expect(GetFeaturesVirtualDom.getFeaturesVirtualDom(features, themesHtml)).toEqual([
    {
      childCount: 3,
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
      className: 'Feature FeatureSelected',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Theme',
      type: 12,
    },
    {
      type: 4,
      className: 'Sash SashVertical',
      childCount: 0,
    },
    {
      childCount: 2,
      className: 'FeatureTheme',
      type: 4,
    },
    {
      childCount: 1,
      type: 5,
    },
    {
      childCount: 0,
      text: 'Themes',
      type: 12,
    },
    {
      type: 4,
      className: 'DefaultMarkdown',
      childCount: 0,
    },
  ])
})
