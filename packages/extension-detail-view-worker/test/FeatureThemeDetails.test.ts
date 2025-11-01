import { test, expect } from '@jest/globals'
import * as FeatureThemeDetails from '../src/parts/FeatureThemeDetails/FeatureThemeDetails.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

test('getThemeDetails should return theme details with themes', async () => {
  const extension = {
    colorThemes: ['theme1', 'theme2'],
    iconThemes: ['icon1'],
    productIconThemes: ['product1'],
  }
  const baseUrl = 'https://example.com'

  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Theme Markdown</h1>'
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 1, childCount: 1 }]
    },
  })

  const protocol = 'test:'

  const result = await FeatureThemeDetails.getThemeDetails(extension, baseUrl, protocol)

  expect(result).toHaveProperty('themesMarkdownDom')
  expect(Array.isArray(result.themesMarkdownDom)).toBe(true)
  expect(mockRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})

test('getThemeDetails should handle empty themes', async () => {
  const extension = {}
  const baseUrl = 'https://example.com'

  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Theme Markdown</h1>'
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 1, childCount: 1 }]
    },
  })

  const protocol = 'test:'
  const result = await FeatureThemeDetails.getThemeDetails(extension, baseUrl, protocol)

  expect(result).toHaveProperty('themesMarkdownDom')
  expect(Array.isArray(result.themesMarkdownDom)).toBe(true)
  expect(mockRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})
