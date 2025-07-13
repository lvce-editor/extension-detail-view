import { expect, test } from '@jest/globals'
import { featureWebViewsEnabled } from '../src/parts/FeatureWebViewsEnabled/FeatureWebViewsEnabled.ts'

test('featureWebViewsEnabled returns true when extension has webViews', () => {
  const extension = { webViews: [{ id: 'test-view', path: 'test.html' }] }
  expect(featureWebViewsEnabled(extension)).toBe(true)
})

test('featureWebViewsEnabled returns false when extension has no webViews', () => {
  const extension = { name: 'test-extension' }
  expect(featureWebViewsEnabled(extension)).toBe(false)
})

test('featureWebViewsEnabled returns false when extension is null', () => {
  expect(featureWebViewsEnabled(null)).toBe(false)
})

test('featureWebViewsEnabled returns false when extension is undefined', () => {
  expect(featureWebViewsEnabled(undefined)).toBe(false)
})

test('featureWebViewsEnabled returns true when webViews is empty array', () => {
  const extension = { webViews: [] }
  expect(featureWebViewsEnabled(extension)).toBe(true)
})
