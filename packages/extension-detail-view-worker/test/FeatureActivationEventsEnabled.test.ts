import { expect, test } from '@jest/globals'
import * as FeatureActivationEventsEnabled from '../src/parts/FeatureActivationEventsEnabled/FeatureActivationEventsEnabled.ts'

test('featureActivationEventsEnabled returns true when extension has activation', () => {
  const extension: unknown = { activation: { onCommand: 'test.command' } }
  expect(FeatureActivationEventsEnabled.featureActivationEventsEnabled(extension)).toBe(true)
})

test('featureActivationEventsEnabled returns false when extension has no activation', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureActivationEventsEnabled.featureActivationEventsEnabled(extension)).toBe(false)
})

test('featureActivationEventsEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureActivationEventsEnabled.featureActivationEventsEnabled(extension)).toBe(false)
})

test('featureActivationEventsEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureActivationEventsEnabled.featureActivationEventsEnabled(extension)).toBe(false)
})

test('featureActivationEventsEnabled returns false when activation is empty object', () => {
  const extension: unknown = { activation: {} }
  expect(FeatureActivationEventsEnabled.featureActivationEventsEnabled(extension)).toBe(false)
})
