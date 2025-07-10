import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as LoadContent from '../src/parts/LoadContent/LoadContent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('loadContent - successful load', async () => {
  const mockExtension = {
    id: 'test-extension',
    name: 'Test Extension',
    description: 'A test extension',
    version: '1.0.0',
    path: '/test/path',
    uri: '/test/uri',
    builtin: false,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      if (method === 'FileSystem.readFile') {
        return '# Test README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 1024
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    uri: 'extension-detail://test-extension',
    width: 800,
    assetDir: '/test/assets',
  })

  const result = await LoadContent.loadContent(state, 1, {})

  expect(result.extension).toEqual(mockExtension)
  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('A test extension')
  expect(result.extensionId).toBe('test-extension')
  expect(result.extensionVersion).toBe('1.0.0')
  expect(result.isBuiltin).toBe(false)
  expect(result.folderSize).toBe(1024)
  expect(result.baseUrl).toBe('/test/path')
  expect(result.iconSrc).toBeDefined()
  expect(result.detailsVirtualDom).toBeDefined()
  expect(result.features).toBeDefined()
  expect(result.categories).toBeDefined()
  expect(result.resources).toBeDefined()
  expect(result.entries).toBeDefined()
  expect(result.secondEntries).toBeDefined()
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

  const state = createDefaultState({
    uri: 'extension-detail://non-existent-extension',
  })

  await expect(LoadContent.loadContent(state, 1, {})).rejects.toThrow('extension not found: non-existent-extension')
})

test('loadContent - with builtin extension', async () => {
  const mockExtension = {
    id: 'builtin-extension',
    name: 'Builtin Extension',
    description: 'A builtin extension',
    version: '1.0.0',
    path: '/test/path',
    builtin: true,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      if (method === 'FileSystem.readFile') {
        return '# Builtin README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 2048
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    uri: 'extension-detail://builtin-extension',
  })

  const result = await LoadContent.loadContent(state, 1, {})

  expect(result.isBuiltin).toBe(true)
  expect(result.extension).toEqual(mockExtension)
})

test('loadContent - with saved state', async () => {
  const mockExtension = {
    id: 'test-extension',
    name: 'Test Extension',
    description: 'A test extension',
    version: '1.0.0',
    path: '/test/path',
    builtin: false,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      if (method === 'FileSystem.readFile') {
        return '# Test README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 1024
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    uri: 'extension-detail://test-extension',
  })

  const savedState = {
    selectedFeature: 'commands',
    selectedTab: 'details',
  }

  const result = await LoadContent.loadContent(state, 1, savedState)

  expect(result.selectedFeature).toBe('commands')
  expect(result.selectedTab).toBe('details')
})

test('loadContent - with different platform', async () => {
  const mockExtension = {
    id: 'test-extension',
    name: 'Test Extension',
    description: 'A test extension',
    version: '1.0.0',
    path: '/test/path',
    uri: '/test/uri',
    builtin: false,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      if (method === 'FileSystem.readFile') {
        return '# Test README Content'
      }
      if (method === 'FileSystem.getFolderSize') {
        return 1024
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState({
    uri: 'extension-detail://test-extension',
  })

  const result = await LoadContent.loadContent(state, 2, {})

  expect(result.extension).toEqual(mockExtension)
  expect(result.baseUrl).toBe('/test/path')
})