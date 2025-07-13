import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as LoadHeaderContent from '../src/parts/LoadHeaderContent/LoadHeaderContent.ts'

test('loadHeaderContent - successful load', async () => {
  const mockExtension: any = {
    id: 'test-extension',
    name: 'Test Extension',
    description: 'A test extension',
    version: '1.0.0',
    path: '/test/path',
    uri: '/test/uri',
    builtin: false,
  }

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
    assetDir: '/test/assets',
  }

  const result = LoadHeaderContent.loadHeaderContent(state, 1, mockExtension)

  expect(result.extension).toEqual(mockExtension)
  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('A test extension')
  expect(result.extensionId).toBe('test-extension')
  expect(result.extensionVersion).toBe('1.0.0')
  expect(result.extensionUri).toBe('/test/uri')
  expect(result.iconSrc).toBeDefined()
})

test('loadHeaderContent - with builtin extension', async () => {
  const mockExtension: any = {
    id: 'builtin-extension',
    name: 'Builtin Extension',
    description: 'A builtin extension',
    version: '1.0.0',
    path: '/test/path',
    builtin: true,
  }

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://builtin-extension',
  }

  const result = LoadHeaderContent.loadHeaderContent(state, 1, mockExtension)

  expect(result.extension).toEqual(mockExtension)
  expect(result.extensionId).toBe('builtin-extension')
  expect(result.name).toBe('Builtin Extension')
})

test('loadHeaderContent - with fallback values', async () => {
  const mockExtension: any = {
    path: '/test/path',
  }

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uri: 'extension-detail://test-extension',
  }

  const result = LoadHeaderContent.loadHeaderContent(state, 1, mockExtension)

  expect(result.extensionId).toBe('n/a')
  expect(result.extensionVersion).toBe('n/a')
  expect(result.extensionUri).toBe('/test/path')
})
