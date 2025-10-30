import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as GetFeatureDetailsTheme from '../src/parts/GetFeatureDetailsTheme/GetFeatureDetailsTheme.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

test('getFeatureDetailsTheme - extension with themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return '<h1>Color Themes</h1><p>Theme content</p>'
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ tag: 'div', children: ['Theme content'] }]
      }
      throw new Error('unexpected method')
    },
  })
  MarkdownWorker.set(mockRpc)

  const extension: any = {
    colorThemes: [{ name: 'Dark Theme', id: 'dark' }],
    iconThemes: [{ name: 'Material Icons', id: 'material' }],
    productIconThemes: [{ name: 'Product Icons', id: 'product' }],
  }
  const baseUrl: string = 'https://example.com'
  const protocol = 'test:'

  const result: any = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl, protocol)
  expect(result).toEqual({
    themesMarkdownDom: [{ tag: 'div', children: ['Theme content'] }],
  })
})

test('getFeatureDetailsTheme - extension without themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return ''
      }
      if (method === 'Markdown.getVirtualDom') {
        return []
      }
      throw new Error('unexpected method')
    },
  })
  MarkdownWorker.set(mockRpc)

  const extension: any = {}
  const baseUrl: string = 'https://example.com'
  const protocol = 'test:'

  const result: any = await GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl, protocol)
  expect(result).toEqual({
    themesMarkdownDom: [],
  })
})

test('getFeatureDetailsTheme - extension with null themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return ''
      }
      if (method === 'Markdown.getVirtualDom') {
        return []
      }
      throw new Error('unexpected method')
    },
  })
  MarkdownWorker.set(mockRpc)

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
})

test('getFeatureDetailsTheme - error propagation', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Markdown.render') {
        throw new Error('render error')
      }
      throw new Error('unexpected method')
    },
  })
  MarkdownWorker.set(mockRpc)

  const extension: any = {
    colorThemes: [{ name: 'Dark Theme', id: 'dark' }],
  }
  const baseUrl: string = 'https://example.com'
  const protocol = 'test:'

  await expect(GetFeatureDetailsTheme.getFeatureDetailsTheme(extension, baseUrl, protocol)).rejects.toThrow('render error')
})
