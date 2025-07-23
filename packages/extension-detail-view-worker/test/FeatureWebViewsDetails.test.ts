import { test, expect } from '@jest/globals'
import * as FeatureWebViewsDetails from '../src/parts/FeatureWebViewsDetails/FeatureWebViewsDetails.ts'

test('getWebViewsDetails should return web views details', async () => {
  const extension = {
    webviews: [
      { id: 'webview1', title: 'Web View 1' },
      { id: 'webview2', title: 'Web View 2' },
    ],
  }

  const result = await FeatureWebViewsDetails.getWebViewsDetails(extension)

  expect(result).toHaveProperty('webViews')
  expect(Array.isArray(result.webViews)).toBe(true)
})

test('getWebViewsDetails should handle empty web views', async () => {
  const extension = {}

  const result = await FeatureWebViewsDetails.getWebViewsDetails(extension)

  expect(result).toHaveProperty('webViews')
  expect(Array.isArray(result.webViews)).toBe(true)
})
