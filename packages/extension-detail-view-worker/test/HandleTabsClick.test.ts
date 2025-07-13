import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { registerAllFeatures } from '../src/parts/FeatureFactory/FeatureFactory.ts'
import { clearRegistry } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as HandleTabsClick from '../src/parts/HandleTabsClick/HandleTabsClick.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handles tabs click - details tab', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readFile') {
        return '<h1>Test Details</h1>'
      }
      if (method === 'MarkdownWorker.render') {
        return '<h1>Test Details</h1>'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    selectedTab: 'Features',
    name: 'Test Extension',
  })

  const result = await HandleTabsClick.handleTabsClick(state, 'Details')

  expect(result.selectedTab).toBe('Details')
  expect(result).not.toBe(state) // Should return a new state object
})

test('handles tabs click - features tab', async () => {
  // Register features first
  registerAllFeatures()

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    selectedTab: 'Details',
    name: 'Test Extension',
    features: [
      {
        id: 'Theme',
        label: 'Theme',
        selected: true,
      },
    ],
  })

  const result = await HandleTabsClick.handleTabsClick(state, 'Features')

  expect(result.selectedTab).toBe('Features')
  expect(result).not.toBe(state) // Should return a new state object

  // Clean up
  clearRegistry()
})

test('handles tabs click - changelog tab', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readFile') {
        return '# Changelog\n\nVersion 1.0.0'
      }
      if (method === 'MarkdownWorker.render') {
        return '<h1>Changelog</h1><p>Version 1.0.0</p>'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    selectedTab: 'Details',
    name: 'Test Extension',
    extension: {
      path: '/test/path',
    },
    baseUrl: 'http://test.com',
  })

  const result = await HandleTabsClick.handleTabsClick(state, 'Changelog')

  expect(result.selectedTab).toBe('Changelog')
  expect(result).not.toBe(state) // Should return a new state object
})

test('handles tabs click - unknown tab', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    selectedTab: 'Details',
    name: 'Test Extension',
  })

  const result = await HandleTabsClick.handleTabsClick(state, 'UnknownTab')

  // The default handler returns the state unchanged
  expect(result.selectedTab).toBe('Details')
  expect(result).toBe(state) // Should return the same state object
})
