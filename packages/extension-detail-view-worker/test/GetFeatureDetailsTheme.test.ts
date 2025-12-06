import { expect, test } from '@jest/globals'
import * as GetFeatureDetailsTheme from '../src/parts/GetFeatureDetailsTheme/GetFeatureDetailsTheme.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

test('getFeatureDetailsTheme - extension with themes', async () => {
  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return [{ children: ['Theme content'], tag: 'div' }]
    },
    'Markdown.render': () => {
      return '<h1>Color Themes</h1><p>Theme content</p>'
    },
  })

  const extension: any = {
    colorThemes: [{ id: 'dark', name: 'Dark Theme' }],
    iconThemes: [{ id: 'material', name: 'Material Icons' }],
    productIconThemes: [{ id: 'product', name: 'Product Icons' }],
  }
  const baseUrl: string = 'https://example.com'
  const protocol = 'test:'

  const result: any = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl, protocol)
  expect(result).toEqual({
    themesMarkdownDom: [{ children: ['Theme content'], tag: 'div' }],
  })
  expect(mockRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})

test('getFeatureDetailsTheme - extension without themes', async () => {
  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return []
    },
    'Markdown.render': () => {
      return ''
    },
  })

  const extension: any = {}
  const baseUrl: string = 'https://example.com'
  const protocol = 'test:'

  const result: any = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl, protocol)
  expect(result).toEqual({
    themesMarkdownDom: [],
  })
  expect(mockRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})

test('getFeatureDetailsTheme - extension with null themes', async () => {
  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return []
    },
    'Markdown.render': () => {
      return ''
    },
  })

  const extension: any = {
    colorThemes: null,
    iconThemes: null,
    productIconThemes: null,
  }
  const baseUrl: string = 'https://example.com'
  const protocol = 'test:'

  const result: any = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl, protocol)
  expect(result).toEqual({
    themesMarkdownDom: [],
  })
  expect(mockRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})

test('getFeatureDetailsTheme - error propagation', async () => {
  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      throw new Error('render error')
    },
  })

  const extension: any = {
    colorThemes: [{ id: 'dark', name: 'Dark Theme' }],
  }
  const baseUrl: string = 'https://example.com'
  const protocol = 'test:'

  await expect(GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl, protocol)).rejects.toThrow('render error')
  expect(mockRpc.invocations).toEqual([['Markdown.render', expect.any(String), expect.any(Object)]])
})
