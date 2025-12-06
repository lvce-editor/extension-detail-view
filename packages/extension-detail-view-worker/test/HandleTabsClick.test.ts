import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { clearRegistry, register } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as HandleTabsClick from '../src/parts/HandleTabsClick/HandleTabsClick.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

test('handles tabs click - details tab', async () => {
  const expectedDom = [{ children: [], tag: 'h1', type: 'element' }]
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'README CONTENT'
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'README CONTENT'
    },
  })

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return expectedDom
    },
    'Markdown.render': () => {
      return '<h1>README CONTENT</h1>'
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    baseUrl: '/test/baseUrl',
    extension: {
      id: 'test-extension',
      name: 'Test Extension',
      path: '/test/path',
      version: '1.0.0',
    },
    platform: 0,
    selectedTab: InputName.Features,
  }

  const result = await HandleTabsClick.handleTabsClick(state, InputName.Details)

  expect(result.selectedTab).toBe(InputName.Details)
  expect(result.detailsVirtualDom).toEqual(expectedDom)
  expect(result).not.toBe(state)
  expect(mockRendererRpc.invocations).toEqual([])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})

test('handles tabs click - features tab', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  const mockFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Theme',
    getVirtualDom: (): any[] => [],
    id: 'Theme',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    features: [{ id: 'Theme', label: 'Theme', selected: false }],
    selectedFeature: '',
    selectedTab: InputName.Details,
  }

  const result = await HandleTabsClick.handleTabsClick(state, InputName.Features)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result).not.toBe(state)
  expect(mockRpc.invocations).toEqual([])

  clearRegistry()
})

test('handles tabs click - changelog tab', async () => {
  const changelogContent = '# Changelog\n\n## Version 1.0.0\n- Initial release'
  const renderedHtml = '<h1>Changelog</h1><h2>Version 1.0.0</h2><ul><li>Initial release</li></ul>'
  const mockDom = [{ childCount: 1, type: VirtualDomElements.Div }]

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return mockDom
    },
    'Markdown.render': () => {
      return renderedHtml
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return changelogContent
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: InputName.Details,
  }

  const result = await HandleTabsClick.handleTabsClick(state, InputName.Changelog)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(result.changelogVirtualDom).toStrictEqual(mockDom)
  expect(result).not.toBe(state)
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
  expect(result.tabs.every((tab) => tab.selected === (tab.name === InputName.Changelog))).toBe(true)
})

test('handles tabs click - unknown tab', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    selectedTab: InputName.Details,
  }

  const result = await HandleTabsClick.handleTabsClick(state, 'unknown-tab')

  expect(result.selectedTab).toBe(InputName.Details)
  expect(result).toBe(state)
})
