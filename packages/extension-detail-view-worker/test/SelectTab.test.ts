import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { FeatureDefinition } from '../src/parts/FeatureDefinition/FeatureDefinition.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { register, clearRegistry } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as SelectTab from '../src/parts/SelectTab/SelectTab.ts'

test('selectTab with Changelog name calls selectTabChangelog handler', async () => {
  const state: ExtensionDetailState = createDefaultState()
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

  const result = await SelectTab.selectTab(state, InputName.Changelog)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(result.changelogVirtualDom).toStrictEqual(mockDom)
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
  expect(result.tabs.every((tab) => tab.selected === (tab.name === InputName.Changelog))).toBe(true)
})

test('selectTab with Details name calls selectTabDetails handler', async () => {
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
  }

  const result = await SelectTab.selectTab(state, InputName.Details)

  expect(result.selectedTab).toBe(InputName.Details)
  expect(result.detailsVirtualDom).toEqual(expectedDom)
  expect(mockRendererRpc.invocations).toEqual([])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})

test('selectTab with Features name calls selectTabFeatures handler', async () => {
  clearRegistry()
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  const settingsFeature: FeatureDefinition = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Settings',
    getVirtualDom: (): any[] => [],
    id: 'Settings',
    isEnabled: (): boolean => true,
  }
  const themeFeature: FeatureDefinition = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Theme',
    getVirtualDom: (): any[] => [],
    id: 'Theme',
    isEnabled: (): boolean => true,
  }
  register(settingsFeature)
  register(themeFeature)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Settings', label: 'Settings', selected: false },
      { id: 'Theme', label: 'Theme', selected: false },
    ],
    selectedFeature: '',
    selectedTab: '',
  }

  const result = await SelectTab.selectTab(state, InputName.Features)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(mockRpc.invocations).toEqual([])
})

test('selectTab with unknown name calls selectTabDefault handler', async () => {
  const state: ExtensionDetailState = createDefaultState()
  const result = await SelectTab.selectTab(state, 'unknown-tab')
  expect(result).toBe(state)
})
