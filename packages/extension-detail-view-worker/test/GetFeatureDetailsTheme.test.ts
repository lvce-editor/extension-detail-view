import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as GetFeatureDetailsTheme from '../src/parts/GetFeatureDetailsTheme/GetFeatureDetailsTheme.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('getFeatureDetailsTheme - extension with themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.renderMarkdown') {
        return '<h1>Color Themes</h1><p>Theme content</p>'
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ tag: 'div', children: ['Theme content'] }]
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)

  const extension = {
    colorThemes: [{ name: 'Dark Theme', id: 'dark' }],
    iconThemes: [{ name: 'Material Icons', id: 'material' }],
    productIconThemes: [{ name: 'Product Icons', id: 'product' }],
  }
  const baseUrl = 'https://example.com'

  const result = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl)
  expect(result).toEqual({
    themesMarkdownDom: [{ tag: 'div', children: ['Theme content'] }],
  })
})

test('getFeatureDetailsTheme - extension without themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.renderMarkdown') {
        return ''
      }
      if (method === 'Markdown.getVirtualDom') {
        return []
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)

  const extension = {}
  const baseUrl = 'https://example.com'

  const result = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl)
  expect(result).toEqual({
    themesMarkdownDom: [],
  })
})

test('getFeatureDetailsTheme - extension with null themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.renderMarkdown') {
        return ''
      }
      if (method === 'Markdown.getVirtualDom') {
        return []
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)

  const extension = {
    colorThemes: null,
    iconThemes: null,
    productIconThemes: null,
  }
  const baseUrl = 'https://example.com'

  const result = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl)
  expect(result).toEqual({
    themesMarkdownDom: [],
  })
})

test('getFeatureDetailsTheme - error propagation', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Markdown.renderMarkdown') {
        throw new Error('render error')
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)

  const extension = {
    colorThemes: [{ name: 'Dark Theme', id: 'dark' }],
  }
  const baseUrl = 'https://example.com'

  await expect(GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl)).rejects.toThrow('render error')
})
