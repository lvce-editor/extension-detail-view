import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { expect, test } from '@jest/globals'
import type { Feature } from '../src/parts/Feature/Feature.ts'
import * as GetFeaturesVirtualDom from '../src/parts/GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'

test.skip('features virtual dom', async () => {
  const themesHtml: readonly VirtualDomNode[] = []
  const features: readonly Feature[] = [
    {
      id: 'Theme',
      label: 'Theme',
      selected: true,
    },
  ]
  const selectedFeature = 'Theme'
  const extension = {}
  expect(GetFeaturesVirtualDom.getFeaturesVirtualDom(features, themesHtml, selectedFeature, extension)).toEqual([
    {
      childCount: 3,
      className: 'Features',
      type: 4,
    },
    {
      childCount: 1,
      className: 'FeaturesList',
      type: 4,
      onClick: 'handleFeaturesClick',
    },
    {
      childCount: 1,
      className: 'Feature FeatureSelected',
      type: 1,
      name: 'Theme',
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
      className: 'FeatureContent',
      type: 4,
    },
    {
      childCount: 1,
      type: 5,
    },
    {
      childCount: 0,
      text: 'Theme',
      type: 12,
    },
    {
      childCount: 1,
      className: 'DefaultMarkdown',
      type: 4,
    },
    {
      childCount: 0,
      className: 'Markdown',
      onContextMenu: 'handleReadmeContextMenu',
      role: 'document',
      type: 4,
    },
  ])
})
