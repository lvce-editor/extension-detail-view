import { afterEach, beforeAll, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { clearRegistry, register } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

beforeAll(() => {
  // @ts-ignore
  globalThis.location = {
    host: 'lvce-editor.github.io',
    origin: 'https://lvce-editor.github.io',
    protocol: 'https:',
  }
})

afterEach(clearRegistry)

test('loadContent - successful load', async () => {
  const mockExtension: any = {
    builtin: false,
    description: 'A test extension',
    id: 'test-extension',
    name: 'Test Extension',
    path: '/test/path',
    uri: '/test/uri',
    version: '1.0.0',
  }

  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
    'Layout.getApplicationName': () => {
      return 'test-app'
    },
    'Layout.getCommit': () => {
      return 'test-commit'
    },
    'Preferences.get': () => {
      return true
    },
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      return true
    },
    'FileSystem.getFolderSize': () => {
      return 1024
    },
    'FileSystem.readFile': () => {
      return '# Test README Content'
    },
  })

  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getMarkdownDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.render': () => {
      return '<h1>Test README Content</h1>'
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    assetDir: '/test/assets',
    uri: 'extension-detail://test-extension',
    width: 800,
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  expect(result.extension).toEqual(mockExtension)
  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('A test extension')
  expect(result.extensionId).toBe('test-extension')
  expect(result.extensionVersion).toBe('1.0.0')
  expect(result.cacheName).toBe('test-app/markdown-cache')
  // expect(result.isBuiltin).toBe(false)
  expect(result.folderSize).toBe(0)
  expect(result.baseUrl).toBe('/test/path')
  expect(result.extensionUri).toBe('https://lvce-editor.github.io/test/uri')
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
  expect(result.settingsButtonEnabled).toBe(true)
  expect(mockRendererRpc.invocations).toEqual([
    ['ExtensionManagement.getExtension', 'test-extension'],
    ['Preferences.get', 'workbench.colorTheme'],
    ['Preferences.getAll'],
    ['Preferences.get', 'workbnech.colorTheme'],
    ['Layout.getApplicationName'],
    ['Layout.getCommit'],
    ['Preferences.get', 'application.linkProtectionEnabled'],
  ])
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.exists', 'https://lvce-editor.github.io/test/uri/README.md'],
    ['FileSystem.exists', 'https://lvce-editor.github.io/test/uri/CHANGELOG.md'],
    ['FileSystem.readFile', 'https://lvce-editor.github.io/test/uri/README.md'],
  ])
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})

test('loadContent - extension not found', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return undefined
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://non-existent-extension',
  }

  const result = await LoadContent.loadContent(state, 1, {})

  expect(result).toMatchObject({
    errorMessage: 'The extension "non-existent-extension" is not available in this version of LVCE Editor.',
    errorTitle: 'Unable to load extension',
    extensionId: 'non-existent-extension',
    initial: false,
  })
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'non-existent-extension']])
})

test('loadContent - unexpected load error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return {
        id: 'test-extension',
        name: 'Test Extension',
        path: '/test/path',
      }
    },
    'Preferences.get': () => {
      throw new Error('Network request failed')
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  const result = await LoadContent.loadContent(state, 1, {})

  expect(result).toMatchObject({
    errorMessage: 'The extension details could not be loaded: Network request failed',
    errorTitle: 'Unable to load extension',
    extensionId: 'test-extension',
    initial: false,
  })
  expect(mockRpc.invocations).toEqual([
    ['ExtensionManagement.getExtension', 'test-extension'],
    ['Preferences.get', 'workbench.colorTheme'],
  ])
})

test('loadContent - with builtin extension', async () => {
  const mockExtension: any = {
    description: 'A builtin extension',
    id: 'builtin.language-basics-java',
    name: 'Builtin Extension',
    path: '/test/path',
    version: '1.0.0',
  }

  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
    'Layout.getApplicationName': () => {
      return 'test-app'
    },
    'Layout.getCommit': () => {
      return 'test-commit'
    },
    'Preferences.get': () => {
      return true
    },
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      return true
    },
    'FileSystem.getFolderSize': () => {
      return 2048
    },
    'FileSystem.readFile': () => {
      return '# Builtin README Content'
    },
  })

  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getMarkdownDom': () => {
      return [{ children: ['Builtin README Content'], type: 'h1' }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ children: ['Builtin README Content'], type: 'h1' }]
    },
    'Markdown.render': () => {
      return '<h1>Builtin README Content</h1>'
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://builtin.language-basics-java',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  expect(result.extension).toEqual(mockExtension)
  expect(result.badge).toBe('builtin')
  expect(result.marketplaceEntries).toEqual([])
  expect(mockRendererRpc.invocations).toEqual([
    ['ExtensionManagement.getExtension', 'builtin.language-basics-java'],
    ['Preferences.get', 'workbench.colorTheme'],
    ['Preferences.getAll'],
    ['Preferences.get', 'workbnech.colorTheme'],
    ['Layout.getApplicationName'],
    ['Layout.getCommit'],
    ['Preferences.get', 'application.linkProtectionEnabled'],
  ])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})

test('loadContent - selects first available feature when saved feature is unavailable', async () => {
  const mockExtension: any = {
    builtin: false,
    description: 'A test extension',
    id: 'test-extension',
    name: 'Test Extension',
    path: '/test/path',
    version: '1.0.0',
  }

  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
    'Layout.getApplicationName': () => {
      return 'test-app'
    },
    'Layout.getCommit': () => {
      return 'test-commit'
    },
    'Preferences.get': () => {
      return true
    },
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      return true
    },
    'FileSystem.getFolderSize': () => {
      return 1024
    },
    'FileSystem.readFile': () => {
      return '# Test README Content'
    },
  })

  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getMarkdownDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.render': () => {
      return '<h1>Test README Content</h1>'
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  register({
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Feature 1',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'feature-1',
    isEnabled: jest.fn((): boolean => true),
  })
  register({
    getDetails: jest.fn(async (): Promise<object> => ({})),
    getLabel: (): string => 'Feature 2',
    getVirtualDom: jest.fn((): any[] => []),
    id: 'feature-2',
    isEnabled: jest.fn((): boolean => true),
  })

  const savedState: any = {
    selectedFeature: 'unavailable-feature',
    selectedTab: 'details',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, savedState)

  expect(result.selectedFeature).toBe('feature-1')
  expect(result.features).toEqual([
    {
      id: 'feature-1',
      label: 'Feature 1',
      selected: true,
    },
    {
      id: 'feature-2',
      label: 'Feature 2',
      selected: false,
    },
  ])
  expect(result.selectedTab).toBe('details')
  expect(mockRendererRpc.invocations).toEqual([
    ['ExtensionManagement.getExtension', 'test-extension'],
    ['Preferences.get', 'workbench.colorTheme'],
    ['Preferences.getAll'],
    ['Preferences.get', 'workbnech.colorTheme'],
    ['Layout.getApplicationName'],
    ['Layout.getCommit'],
    ['Preferences.get', 'application.linkProtectionEnabled'],
  ])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})

test('loadContent - loads the selected feature details when restoring the features tab', async () => {
  const mockExtension: any = {
    builtin: false,
    colorThemes: [{ id: 'test-theme', label: 'Test Theme' }],
    description: 'A test theme extension',
    id: 'test-extension',
    name: 'Test Extension',
    path: '/test/path',
    version: '1.0.0',
  }
  const themesMarkdownDom: any[] = [{ children: ['Themes'], type: 'h1' }]
  const getDetails = jest.fn(
    async (_extension: any, _baseUrl: string, _locationProtocol: string, _cacheName: string): Promise<{ themesMarkdownDom: any[] }> => {
      return {
        themesMarkdownDom,
      }
    },
  )

  register({
    getDetails,
    getLabel: (): string => 'Themes',
    getVirtualDom: jest.fn((): any[] => []),
    id: InputName.Theme,
    isEnabled: jest.fn((): boolean => true),
  })

  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
    'Layout.getApplicationName': () => {
      return 'test-app'
    },
    'Layout.getCommit': () => {
      return 'test-commit'
    },
    'Preferences.get': () => {
      return true
    },
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      return true
    },
    'FileSystem.getFolderSize': () => {
      return 1024
    },
    'FileSystem.readFile': () => {
      return '# Test README Content'
    },
  })

  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getMarkdownDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.render': () => {
      return '<h1>Test README Content</h1>'
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }
  const savedState = {
    selectedFeature: InputName.Theme,
    selectedTab: InputName.Features,
  }

  const result = await LoadContent.loadContent(state, 1, savedState)

  expect(result.selectedFeature).toBe(InputName.Theme)
  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.themesMarkdownDom).toBe(themesMarkdownDom)
  expect(getDetails).toHaveBeenCalledWith(mockExtension, '/test/path', 'https:', 'test-app/markdown-cache')
  expect(mockRendererRpc.invocations.length).toBeGreaterThan(0)
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})

test('loadContent - with different platform', async () => {
  const mockExtension: any = {
    builtin: false,
    description: 'A test extension',
    id: 'test-extension',
    name: 'Test Extension',
    path: '/test/path',
    uri: '/test/uri',
    version: '1.0.0',
  }

  using mockRendererRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
    'Layout.getApplicationName': () => {
      return 'test-app'
    },
    'Layout.getCommit': () => {
      return 'test-commit'
    },
    'Preferences.get': () => {
      return true
    },
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      return true
    },
    'FileSystem.getFolderSize': () => {
      return 1024
    },
    'FileSystem.readFile': () => {
      return '# Test README Content'
    },
  })

  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getMarkdownDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.getVirtualDom': () => {
      return [{ children: ['Test README Content'], type: 'h1' }]
    },
    'Markdown.render': () => {
      return '<h1>Test README Content</h1>'
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  expect(result.extension).toEqual(mockExtension)
  expect(mockRendererRpc.invocations).toEqual([
    ['ExtensionManagement.getExtension', 'test-extension'],
    ['Preferences.get', 'workbench.colorTheme'],
    ['Preferences.getAll'],
    ['Preferences.get', 'workbnech.colorTheme'],
    ['Layout.getApplicationName'],
    ['Layout.getCommit'],
    ['Preferences.get', 'application.linkProtectionEnabled'],
  ])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
})
