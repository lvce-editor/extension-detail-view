import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as HandleTabsClick from '../src/parts/HandleTabsClick/HandleTabsClick.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test.skip('handles tabs click - details tab', async () => {
  const state = {
    selectedTab: 'Features',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(await HandleTabsClick.handleTabsClick(state, 'Details')).toEqual({
    ...state,
    selectedTab: 'Details',
    detailsMarkdownHtml: '<h1>Test</h1>',
  })
})

test.skip('handles tabs click - features tab', async () => {
  const state = {
    selectedTab: 'Details',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(await HandleTabsClick.handleTabsClick(state, 'Features')).toEqual({
    ...state,
    selectedTab: 'Features',
  })
})

test.skip('handles tabs click - changelog tab', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValueOnce('') // FileSystem.readFile returns empty string
  invoke.mockResolvedValueOnce('<p>Changelog content</p>') // RenderMarkdown returns HTML

  const state = {
    selectedTab: 'Details',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
    extension: {
      path: '/test/path',
    },
    baseUrl: 'http://test.com',
  } as any
  expect(await HandleTabsClick.handleTabsClick(state, 'Changelog')).toEqual({
    ...state,
    selectedTab: 'Changelog',
    changelogMarkdownHtml: '<p>Changelog content</p>',
  })
})
