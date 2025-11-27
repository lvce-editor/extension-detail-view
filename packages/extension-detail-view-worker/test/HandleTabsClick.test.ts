import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { registerAllFeatures } from '../src/parts/FeatureFactory/FeatureFactory.ts'
import { clearRegistry } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as HandleTabsClick from '../src/parts/HandleTabsClick/HandleTabsClick.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test.skip('handles tabs click - details tab', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '<h1>Test Details</h1>'
    },
  })

  MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Test Details</h1>'
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 'element', tag: 'h1', children: [] }]
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Features',
    name: 'Test Extension',
  }

  const result = await HandleTabsClick.handleTabsClick(state, 'Details')

  expect(result.selectedTab).toBe('Details')
  expect(result).not.toBe(state) // Should return a new state object
  expect(mockRendererRpc.invocations).toEqual([['FileSystem.readFile', expect.any(String)]])
})

test.skip('handles tabs click - features tab', async () => {
  // Register features first
  registerAllFeatures()

  const mockRendererRpc = RendererWorker.registerMockRpc({})

  MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Theme Details</h1>'
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 'element', tag: 'h1', children: [] }]
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Details',
    name: 'Test Extension',
    features: [
      {
        id: 'Theme',
        label: 'Theme',
        selected: true,
      },
    ],
  }

  const result = await HandleTabsClick.handleTabsClick(state, 'Features')

  expect(result.selectedTab).toBe('Features')
  expect(result).not.toBe(state) // Should return a new state object
  expect(mockRendererRpc.invocations).toEqual([])

  // Clean up
  clearRegistry()
})

test.skip('handles tabs click - changelog tab', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '# Changelog\n\nVersion 1.0.0'
    },
  })

  MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Changelog</h1><p>Version 1.0.0</p>'
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 'element', tag: 'h1', children: [] }]
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Details',
    name: 'Test Extension',
    extension: {
      path: '/test/path',
    },
    baseUrl: 'http://test.com',
  }

  const result = await HandleTabsClick.handleTabsClick(state, 'Changelog')

  expect(result.selectedTab).toBe('Changelog')
  expect(result).not.toBe(state) // Should return a new state object
  expect(mockRendererRpc.invocations).toEqual([['FileSystem.readFile', expect.any(String)]])
})

test.skip('handles tabs click - unknown tab', async () => {
  const mockRendererRpc = RendererWorker.registerMockRpc({})

  MarkdownWorker.registerMockRpc({})

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: 'Details',
    name: 'Test Extension',
  }

  const result = await HandleTabsClick.handleTabsClick(state, 'UnknownTab')

  // The default handler returns the state unchanged
  expect(result.selectedTab).toBe('Details')
  expect(result).toBe(state) // Should return the same state object
  expect(mockRendererRpc.invocations).toEqual([])
})
