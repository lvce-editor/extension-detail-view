import { beforeAll, expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

beforeAll(() => {
  // @ts-ignore
  globalThis.location = {
    protocol: 'https:',
  }
})

test('loadContent - successful load', async () => {
  const mockExtension: any = {
    id: 'test-extension',
    name: 'Test Extension',
    description: 'A test extension',
    version: '1.0.0',
    path: '/test/path',
    uri: '/test/uri',
    builtin: false,
  }

  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '# Test README Content'
    },
    'FileSystem.getFolderSize': () => {
      return 1024
    },
    'FileSystem.exists': () => {
      return true
    },
  })

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Test README Content</h1>'
    },
    'Markdown.getMarkdownDom': () => {
      return [{ type: 'h1', children: ['Test README Content'] }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 'h1', children: ['Test README Content'] }]
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
    width: 800,
    assetDir: '/test/assets',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  expect(result.extension).toEqual(mockExtension)
  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('A test extension')
  expect(result.extensionId).toBe('test-extension')
  expect(result.extensionVersion).toBe('1.0.0')
  // expect(result.isBuiltin).toBe(false)
  expect(result.folderSize).toBe(1024)
  expect(result.baseUrl).toBe('/test/path')
  expect(result.iconSrc).toBeDefined()
  expect(result.detailsVirtualDom).toBeDefined()
  expect(result.features).toBeDefined()
  expect(result.categories).toBeDefined()
  expect(result.resources).toBeDefined()
  expect(result.installationEntries).toBeDefined()
  expect(result.marketplaceEntries).toBeDefined()
  expect(result.displaySize).toBeDefined()
  expect(result.sizeValue).toBeDefined()
  expect(result.hasColorTheme).toBeDefined()
  expect(mockRendererRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-extension']])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})

test('loadContent - extension not found', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return undefined
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://non-existent-extension',
  }

  await expect(LoadContent.loadContent(state, 1, {})).rejects.toThrow('extension not found: non-existent-extension')
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'non-existent-extension']])
})

test('loadContent - with builtin extension', async () => {
  const mockExtension: any = {
    id: 'builtin-extension',
    name: 'Builtin Extension',
    description: 'A builtin extension',
    version: '1.0.0',
    path: '/test/path',
    builtin: true,
  }

  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '# Builtin README Content'
    },
    'FileSystem.getFolderSize': () => {
      return 2048
    },
    'FileSystem.exists': () => {
      return true
    },
  })

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Builtin README Content</h1>'
    },
    'Markdown.getMarkdownDom': () => {
      return [{ type: 'h1', children: ['Builtin README Content'] }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 'h1', children: ['Builtin README Content'] }]
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://builtin-extension',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  // expect(result.isBuiltin).toBe(true)
  expect(result.extension).toEqual(mockExtension)
  expect(mockRendererRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'builtin-extension']])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})

test('loadContent - with saved state', async () => {
  const mockExtension: any = {
    id: 'test-extension',
    name: 'Test Extension',
    description: 'A test extension',
    version: '1.0.0',
    path: '/test/path',
    builtin: false,
  }

  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '# Test README Content'
    },
    'FileSystem.getFolderSize': () => {
      return 1024
    },
    'FileSystem.exists': () => {
      return true
    },
  })

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Test README Content</h1>'
    },
    'Markdown.getMarkdownDom': () => {
      return [{ type: 'h1', children: ['Test README Content'] }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 'h1', children: ['Test README Content'] }]
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  const savedState: any = {
    selectedFeature: 'commands',
    selectedTab: 'details',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, savedState)

  expect(result.selectedFeature).toBe('')
  expect(result.selectedTab).toBe('details')
  expect(mockRendererRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-extension']])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})

test('loadContent - with different platform', async () => {
  const mockExtension: any = {
    id: 'test-extension',
    name: 'Test Extension',
    description: 'A test extension',
    version: '1.0.0',
    path: '/test/path',
    uri: '/test/uri',
    builtin: false,
  }

  const mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '# Test README Content'
    },
    'FileSystem.getFolderSize': () => {
      return 1024
    },
    'FileSystem.exists': () => {
      return true
    },
  })

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>Test README Content</h1>'
    },
    'Markdown.getMarkdownDom': () => {
      return [{ type: 'h1', children: ['Test README Content'] }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ type: 'h1', children: ['Test README Content'] }]
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  expect(result.extension).toEqual(mockExtension)
  expect(mockRendererRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-extension']])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})
