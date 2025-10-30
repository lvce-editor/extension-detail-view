import { beforeAll, expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

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

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockFileSystemRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'FileSystem.readFile') {
        return '# Test README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 1024
      }
      if (method === 'FileSystem.exists') {
        return true
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockFileSystemRpc)

  const mockMarkdownRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return '<h1>Test README Content</h1>'
      }
      if (method === 'Markdown.getMarkdownDom') {
        return [{ type: 'h1', children: ['Test README Content'] }]
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ type: 'h1', children: ['Test README Content'] }]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockMarkdownRpc)

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
})

test('loadContent - extension not found', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionManagement.getExtension') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://non-existent-extension',
  }

  await expect(LoadContent.loadContent(state, 1, {})).rejects.toThrow('extension not found: non-existent-extension')
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

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockFileSystemRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'FileSystem.readFile') {
        return '# Builtin README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 2048
      }
      if (method === 'FileSystem.exists') {
        return true
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockFileSystemRpc)

  const mockMarkdownRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return '<h1>Builtin README Content</h1>'
      }
      if (method === 'Markdown.getMarkdownDom') {
        return [{ type: 'h1', children: ['Builtin README Content'] }]
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ type: 'h1', children: ['Builtin README Content'] }]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockMarkdownRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://builtin-extension',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  // expect(result.isBuiltin).toBe(true)
  expect(result.extension).toEqual(mockExtension)
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

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockFileSystemRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'FileSystem.readFile') {
        return '# Test README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 1024
      }
      if (method === 'FileSystem.exists') {
        return true
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockFileSystemRpc)

  const mockMarkdownRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return '<h1>Test README Content</h1>'
      }
      if (method === 'Markdown.getMarkdownDom') {
        return [{ type: 'h1', children: ['Test README Content'] }]
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ type: 'h1', children: ['Test README Content'] }]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockMarkdownRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  const savedState: any = {
    selectedFeature: 'commands',
    selectedTab: 'details',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, savedState)

  expect(result.selectedFeature).toBe('commands')
  expect(result.selectedTab).toBe('details')
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

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockFileSystemRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'FileSystem.readFile') {
        return '# Test README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 1024
      }
      if (method === 'FileSystem.exists') {
        return true
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockFileSystemRpc)

  const mockMarkdownRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return '<h1>Test README Content</h1>'
      }
      if (method === 'Markdown.getMarkdownDom') {
        return [{ type: 'h1', children: ['Test README Content'] }]
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ type: 'h1', children: ['Test README Content'] }]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockMarkdownRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  const result: ExtensionDetailState = await LoadContent.loadContent(state, 1, {})

  expect(result.extension).toEqual(mockExtension)
})
