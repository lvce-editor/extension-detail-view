import { expect, test } from '@jest/globals'
import * as GetFeaturesVirtualDom from '../src/parts/GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'

test('features virtual dom', () => {
  const themesHtml = ''
  expect(GetFeaturesVirtualDom.getFeaturesVirtualDom(themesHtml)).toEqual([
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

    {
      childCount: 1,
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
  ])
})
