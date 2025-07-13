import { expect, test } from '@jest/globals'
import { featureWebViewsEnabled } from '../src/parts/FeatureWebViewsEnabled/FeatureWebViewsEnabled.ts'

test('featureWebViewsEnabled returns webViews when extension has webViews', () => {
  const extension = { webViews: [{ id: 'test-view', path: 'test.html' }] }
  expect(featureWebViewsEnabled(extension)).toEqual([{ id: 'test-view', path: 'test.html' }])
})

test('featureWebViewsEnabled returns undefined when extension has no webViews', () => {
  const extension = { name: 'test-extension' }
  expect(featureWebViewsEnabled(extension)).toBeUndefined()
})

test('featureWebViewsEnabled returns null when extension is null', () => {
  expect(featureWebViewsEnabled(null)).toBeNull()
})

test('featureWebViewsEnabled returns undefined when extension is undefined', () => {
  expect(featureWebViewsEnabled(undefined)).toBeUndefined()
})

test('featureWebViewsEnabled returns empty array when webViews is empty array', () => {
  const extension = { webViews: [] }
  expect(featureWebViewsEnabled(extension)).toEqual([])
})