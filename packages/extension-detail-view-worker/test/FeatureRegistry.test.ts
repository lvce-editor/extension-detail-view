import { expect, jest, test, beforeEach } from '@jest/globals'
import { FeatureNotFoundError } from '../src/parts/FeatureNotFoundError/FeatureNotFoundError.ts'
import {
  getFeatureDetailsHandler,
  getFeatures,
  getFeatureVirtualDomHandler,
  register,
  clearRegistry,
} from '../src/parts/FeatureRegistry/FeatureRegistry.ts'

beforeEach(clearRegistry)

test('register adds feature to registry', () => {
  const mockFeature = {
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Test Feature',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'test-feature',
    isEnabled: jest.fn((): boolean => true),
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
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Enabled Feature',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'enabled-feature',
    isEnabled: jest.fn((): boolean => true),
  }

  const disabledFeature = {
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Disabled Feature',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'disabled-feature',
    isEnabled: jest.fn((): boolean => false),
  }

  register(enabledFeature)
  register(disabledFeature)

  const features = getFeatures('enabled-feature', {})
  expect(features).toHaveLength(1)
  expect(features.find((f) => f.id === 'enabled-feature')).toBeDefined()
  expect(features.find((f) => f.id === 'disabled-feature')).toBeUndefined()
})

test('getFeatures marks selected feature correctly', () => {
  const feature1 = {
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Feature 1',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'feature-1',
    isEnabled: jest.fn((): boolean => true),
  }

  const feature2 = {
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Feature 2',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'feature-2',
    isEnabled: jest.fn((): boolean => true),
  }

  register(feature1)
  register(feature2)

  const features = getFeatures('feature-1', {})
  const selectedFeature = features.find((f) => f.id === 'feature-1')
  const unselectedFeature = features.find((f) => f.id === 'feature-2')

  expect(selectedFeature?.selected).toBe(true)
  expect(unselectedFeature?.selected).toBe(false)
})

test('getFeatureDetailsHandler returns handler for existing feature', () => {
  const mockHandler = jest.fn(async (): Promise<object> => ({}))
  const mockFeature = {
    getDetails: mockHandler,
    getLabel: (): string => 'Test Feature',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'test-feature',
    isEnabled: jest.fn((): boolean => true),
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

test.skip('getFeatureVirtualDomHandler returns handler for existing feature', () => {
  const mockHandler = jest.fn((): any[] => [])
  const mockFeature = {
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Test Feature',
    getVirtualDom: mockHandler,
    id: 'test-feature',
    isEnabled: jest.fn((): boolean => true),
  }

  register(mockFeature)
  const handler = getFeatureVirtualDomHandler('test-feature')

  expect(handler).toBe(mockHandler)
})

test.skip('getFeatureVirtualDomHandler throws error for non-existent feature', () => {
  expect(() => {
    getFeatureVirtualDomHandler('non-existent-feature')
  }).toThrow(FeatureNotFoundError)
})
