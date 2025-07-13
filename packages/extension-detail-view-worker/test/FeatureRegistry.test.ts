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
    id: 'test-feature',
    getLabel: (): string => 'Test Feature',
    isEnabled: jest.fn((): boolean => true),
    getDetails: jest.fn((): Promise<object> => Promise.resolve({})),
    getVirtualDom: jest.fn((): any[] => []),
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
    getLabel: (): string => 'Enabled Feature',
    isEnabled: jest.fn((): boolean => true),
    getDetails: jest.fn((): Promise<object> => Promise.resolve({})),
    getVirtualDom: jest.fn((): any[] => []),
  }

  const disabledFeature = {
    id: 'disabled-feature',
    getLabel: (): string => 'Disabled Feature',
    isEnabled: jest.fn((): boolean => false),
    getDetails: jest.fn((): Promise<object> => Promise.resolve({})),
    getVirtualDom: jest.fn((): any[] => []),
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
    id: 'feature-1',
    getLabel: (): string => 'Feature 1',
    isEnabled: jest.fn((): boolean => true),
    getDetails: jest.fn((): Promise<object> => Promise.resolve({})),
    getVirtualDom: jest.fn((): any[] => []),
  }

  const feature2 = {
    id: 'feature-2',
    getLabel: (): string => 'Feature 2',
    isEnabled: jest.fn((): boolean => true),
    getDetails: jest.fn((): Promise<object> => Promise.resolve({})),
    getVirtualDom: jest.fn((): any[] => []),
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
  const mockHandler = jest.fn((): Promise<object> => Promise.resolve({}))
  const mockFeature = {
    id: 'test-feature',
    getLabel: (): string => 'Test Feature',
    isEnabled: jest.fn((): boolean => true),
    getDetails: mockHandler,
    getVirtualDom: jest.fn((): any[] => []),
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
  const mockHandler = jest.fn((): any[] => [])
  const mockFeature = {
    id: 'test-feature',
    getLabel: (): string => 'Test Feature',
    isEnabled: jest.fn((): boolean => true),
    getDetails: jest.fn((): Promise<{}> => Promise.resolve({})),
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
