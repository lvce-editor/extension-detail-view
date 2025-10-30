import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as FeatureThemeDetails from '../src/parts/FeatureThemeDetails/FeatureThemeDetails.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

test('getThemeDetails should return theme details with themes', async () => {
  const extension = {
    colorThemes: ['theme1', 'theme2'],
    iconThemes: ['icon1'],
    productIconThemes: ['product1'],
  }
  const baseUrl = 'https://example.com'

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Markdown.render') {
        return '<h1>Theme Markdown</h1>'
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ type: 1, childCount: 1 }]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockRpc)

  const protocol = 'test:'

  const result = await FeatureThemeDetails.getThemeDetails(extension, baseUrl, protocol)

  expect(result).toHaveProperty('themesMarkdownDom')
  expect(Array.isArray(result.themesMarkdownDom)).toBe(true)
})

test('getThemeDetails should handle empty themes', async () => {
  const extension = {}
  const baseUrl = 'https://example.com'

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Markdown.render') {
        return '<h1>Theme Markdown</h1>'
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ type: 1, childCount: 1 }]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockRpc)

  const protocol = 'test:'
  const result = await FeatureThemeDetails.getThemeDetails(extension, baseUrl, protocol)

  expect(result).toHaveProperty('themesMarkdownDom')
  expect(Array.isArray(result.themesMarkdownDom)).toBe(true)
})
