import { jest, test, expect } from '@jest/globals'
import { register, getFeatures, getFeatureDetailsHandler, getFeatureVirtualDomHandler } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import { FeatureNotFoundError } from '../src/parts/FeatureNotFoundError/FeatureNotFoundError.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('register adds feature to registry', () => {
  const mockFeature = {
    id: 'test-feature',
    getLabel: () => 'Test Feature',
    isEnabled: jest.fn(() => true),
    getDetails: jest.fn(() => Promise.resolve({})),
    getVirtualDom: jest.fn(() => []),
  }

  register(mockFeature)

  const features = getFeatures('test-feature', {})
  expect(features).toHaveLength(1)
  expect(features[0].id).toBe('test-feature')
  expect(features[0].label).toBe('Test Feature')
  expect(features[0].selected).toBe(true)
})

test('getFeatures returns only enabled features', () => {
  const enabledFeature = {
    id: 'enabled-feature',
    getLabel: () => 'Enabled Feature',
    isEnabled: jest.fn(() => true),
    getDetails: jest.fn(() => Promise.resolve({})),
    getVirtualDom: jest.fn(() => []),
  }

  const disabledFeature = {
    id: 'disabled-feature',
    getLabel: () => 'Disabled Feature',
    isEnabled: jest.fn(() => false),
    getDetails: jest.fn(() => Promise.resolve({})),
    getVirtualDom: jest.fn(() => []),
  }

  register(enabledFeature)
  register(disabledFeature)

  const features = getFeatures('enabled-feature', {})
  expect(features).toHaveLength(2)
  expect(features.find(f => f.id === 'enabled-feature')).toBeDefined()
  expect(features.find(f => f.id === 'disabled-feature')).toBeDefined()
})

test('getFeatures marks selected feature correctly', () => {
  const feature1 = {
    id: 'feature-1',
    getLabel: () => 'Feature 1',
    isEnabled: jest.fn(() => true),
    getDetails: jest.fn(() => Promise.resolve({})),
    getVirtualDom: jest.fn(() => []),
  }

  const feature2 = {
    id: 'feature-2',
    getLabel: () => 'Feature 2',
    isEnabled: jest.fn(() => true),
    getDetails: jest.fn(() => Promise.resolve({})),
    getVirtualDom: jest.fn(() => []),
  }

  register(feature1)
  register(feature2)

  const features = getFeatures('feature-1', {})
  const selectedFeature = features.find(f => f.id === 'feature-1')
  const unselectedFeature = features.find(f => f.id === 'feature-2')

  expect(selectedFeature?.selected).toBe(true)
  expect(unselectedFeature?.selected).toBe(false)
})

test('getFeatureDetailsHandler returns handler for existing feature', () => {
  const mockHandler = jest.fn(() => Promise.resolve({}))
  const mockFeature = {
    id: 'test-feature',
    getLabel: () => 'Test Feature',
    isEnabled: jest.fn(() => true),
    getDetails: mockHandler,
    getVirtualDom: jest.fn(() => []),
  }

  register(mockFeature)
  const handler = getFeatureDetailsHandler('test-feature')

  expect(handler).toBe(mockHandler)
})

test('getFeatureDetailsHandler throws error for non-existent feature', () => {
  expect(() => {
    getFeatureDetailsHandler('non-existent-feature')
  }).toThrow(FeatureNotFoundError)
})

test('getFeatureVirtualDomHandler returns handler for existing feature', () => {
  const mockHandler = jest.fn(() => [])
  const mockFeature = {
    id: 'test-feature',
    getLabel: () => 'Test Feature',
    isEnabled: jest.fn(() => true),
    getDetails: jest.fn(() => Promise.resolve({})),
    getVirtualDom: mockHandler,
  }

  register(mockFeature)
  const handler = getFeatureVirtualDomHandler('test-feature')

  expect(handler).toBe(mockHandler)
})

test('getFeatureVirtualDomHandler throws error for non-existent feature', () => {
  expect(() => {
    getFeatureVirtualDomHandler('non-existent-feature')
  }).toThrow(FeatureNotFoundError)
})