import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { Feature } from '../src/parts/Feature/Feature.ts'
import type { FeatureDefinition } from '../src/parts/FeatureDefinition/FeatureDefinition.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { clearRegistry, register } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as GetFeaturesVirtualDom from '../src/parts/GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'

test('getFeaturesVirtualDom - empty features array', () => {
  const features: readonly Feature[] = []
  const state: ExtensionDetailState = createDefaultState()
  const result = GetFeaturesVirtualDom.getFeaturesVirtualDom(features, '', state)
  expect(result.length).toBe(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.Features,
    type: VirtualDomElements.Div,
  })
})

test('getFeaturesVirtualDom - non-empty features with registered feature', () => {
  const mockFeatureVirtualDom: readonly VirtualDomNode[] = [
    {
      childCount: 1,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      type: VirtualDomElements.P,
    },
  ]

  const mockFeature: FeatureDefinition = {
    getDetails: async () => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Test Feature',
    getVirtualDom: (): readonly VirtualDomNode[] => mockFeatureVirtualDom,
    id: 'TestFeature',
    isEnabled: (): boolean => true,
  }

  register(mockFeature)

  const features: readonly Feature[] = [
    {
      id: 'TestFeature',
      label: 'Test Feature',
      selected: true,
    },
  ]

  const state: ExtensionDetailState = createDefaultState()
  const result = GetFeaturesVirtualDom.getFeaturesVirtualDom(features, 'TestFeature', state)

  expect(result.length).toBeGreaterThan(0)
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.Features,
    type: VirtualDomElements.Div,
  })

  const sashIndex = result.findIndex((node) => node.className === MergeClassNames.mergeClassNames(ClassNames.Sash, ClassNames.SashVertical))
  expect(sashIndex).toBeGreaterThan(-1)

  const featureContentIndex = result.findIndex((node) => node.className === ClassNames.FeatureContent)
  expect(featureContentIndex).toBeGreaterThan(-1)

  clearRegistry()
})

test('getFeaturesVirtualDom - non-empty features with unregistered feature', () => {
  const features: readonly Feature[] = [
    {
      id: 'UnregisteredFeature',
      label: 'Unregistered Feature',
      selected: true,
    },
  ]

  const state: ExtensionDetailState = createDefaultState()
  const result = GetFeaturesVirtualDom.getFeaturesVirtualDom(features, 'UnregisteredFeature', state)

  expect(result.length).toBeGreaterThan(0)
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.Features,
    type: VirtualDomElements.Div,
  })

  const sashIndex = result.findIndex((node) => node.className === MergeClassNames.mergeClassNames(ClassNames.Sash, ClassNames.SashVertical))
  expect(sashIndex).toBeGreaterThan(-1)
})

test('getFeaturesVirtualDom - multiple features', () => {
  const mockFeature1VirtualDom: readonly VirtualDomNode[] = [
    {
      childCount: 0,
      type: VirtualDomElements.Div,
    },
  ]

  const mockFeature1: FeatureDefinition = {
    getDetails: async () => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Feature 1',
    getVirtualDom: (): readonly VirtualDomNode[] => mockFeature1VirtualDom,
    id: 'Feature1',
    isEnabled: (): boolean => true,
  }

  const mockFeature2: FeatureDefinition = {
    getDetails: async () => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Feature 2',
    getVirtualDom: (): readonly VirtualDomNode[] => [
      {
        childCount: 0,
        type: VirtualDomElements.Span,
      },
    ],
    id: 'Feature2',
    isEnabled: (): boolean => true,
  }

  register(mockFeature1)
  register(mockFeature2)

  const features: readonly Feature[] = [
    {
      id: 'Feature1',
      label: 'Feature 1',
      selected: false,
    },
    {
      id: 'Feature2',
      label: 'Feature 2',
      selected: true,
    },
  ]

  const state: ExtensionDetailState = createDefaultState()
  const result = GetFeaturesVirtualDom.getFeaturesVirtualDom(features, 'Feature2', state)

  expect(result.length).toBeGreaterThan(0)
  expect(result[0]).toEqual({
    childCount: 3,
    className: ClassNames.Features,
    type: VirtualDomElements.Div,
  })

  const featuresListIndex = result.findIndex((node) => node.className === ClassNames.FeaturesList)
  expect(featuresListIndex).toBeGreaterThan(-1)

  clearRegistry()
})
