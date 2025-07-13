import { expect, test } from '@jest/globals'
import * as FeatureWebViewsEnabled from '../src/parts/FeatureWebViewsEnabled/FeatureWebViewsEnabled.ts'

test('featureWebViewsEnabled returns true when extension has webViews', () => {
  const extension: unknown = { webViews: [{ id: 'test-view', path: 'test.html' }] }
  expect(FeatureWebViewsEnabled.featureWebViewsEnabled(extension)).toBe(true)
})

test('featureWebViewsEnabled returns false when extension has no webViews', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureWebViewsEnabled.featureWebViewsEnabled(extension)).toBe(false)
})

test('featureWebViewsEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureWebViewsEnabled.featureWebViewsEnabled(extension)).toBe(false)
})

test('featureWebViewsEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureWebViewsEnabled.featureWebViewsEnabled(extension)).toBe(false)
})

test('featureWebViewsEnabled returns true when webViews is empty array', () => {
  const extension: unknown = { webViews: [] }
  expect(FeatureWebViewsEnabled.featureWebViewsEnabled(extension)).toBe(true)
})
