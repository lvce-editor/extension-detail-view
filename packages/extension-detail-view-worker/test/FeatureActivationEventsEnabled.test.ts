import { expect, test } from '@jest/globals'
import { featureActivationEventsEnabled } from '../src/parts/FeatureActivationEventsEnabled/FeatureActivationEventsEnabled.ts'

test('featureActivationEventsEnabled returns true when extension has activation', () => {
  const extension = { activation: { onCommand: 'test.command' } }
  expect(featureActivationEventsEnabled(extension)).toBe(true)
})

test('featureActivationEventsEnabled returns false when extension has no activation', () => {
  const extension = { name: 'test-extension' }
  expect(featureActivationEventsEnabled(extension)).toBe(false)
})

test('featureActivationEventsEnabled returns false when extension is null', () => {
  expect(featureActivationEventsEnabled(null)).toBe(false)
})

test('featureActivationEventsEnabled returns false when extension is undefined', () => {
  expect(featureActivationEventsEnabled(undefined)).toBe(false)
})

test('featureActivationEventsEnabled returns false when activation is empty object', () => {
  const extension = { activation: {} }
  expect(featureActivationEventsEnabled(extension)).toBe(false)
})