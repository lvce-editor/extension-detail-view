import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickDisable } from '../src/parts/HandleClickDisable/HandleClickDisable.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('handleClickDisable - successful disable with extension becoming disabled', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: true, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      return null
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await handleClickDisable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(true)
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Enable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.disable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickDisable - successful disable with extension already disabled', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    disabled: true,
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: true, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      return null
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await handleClickDisable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(true)
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Enable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.disable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickDisable - handles error from disableExtension', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const errorMessage = 'Failed to disable extension'
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      /**/
    },
    'ExtensionManagement.disable': () => {
      return errorMessage
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await handleClickDisable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(false)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.disable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ConfirmPrompt.prompt', errorMessage])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickDisable - preserves state properties', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    description: 'Test Description',
    extensionId: 'test-extension-id',
    hasColorTheme: true,
    name: 'Test Extension',
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: true, id: 'test-extension-id' }
  RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      return null
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await handleClickDisable(state)

  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('Test Description')
  expect(result.hasColorTheme).toBe(true)
  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(true)
})

test('handleClickDisable - with hasColorTheme true and disabled true', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: true,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: true, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      return null
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await handleClickDisable(state)

  expect(result.disabled).toBe(true)
  expect(result.buttons.length).toBe(3)
  expect(result.buttons.some((button) => button.name === 'SetColorTheme')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Enable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.disable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickDisable - extension not found (undefined)', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      return null
    },
    'ExtensionManagement.getExtension': () => {
      return undefined
    },
  })

  const result = await handleClickDisable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBeUndefined()
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.disable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickDisable - error with Error object', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const error = new Error('Disable failed')
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      /**/
    },
    'ExtensionManagement.disable': () => {
      return error
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await handleClickDisable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.disable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ConfirmPrompt.prompt', 'Error: Disable failed'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})
