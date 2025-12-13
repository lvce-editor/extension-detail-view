import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickEnable from '../src/parts/HandleClickEnable/HandleClickEnable.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('handleClickEnable calls enableExtension with extensionId and returns updated state', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      /**/
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(false)
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.enable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickEnable handles error from enableExtension', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const errorMessage = 'Failed to enable extension'
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      /**/
    },
    'ExtensionManagement.enable': () => {
      return errorMessage
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(false)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.enable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ConfirmPrompt.prompt', errorMessage])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickEnable updates state when extension becomes enabled', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    disabled: true,
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      /**/
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result.disabled).toBe(false)
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.enable', 'test-extension-id'])
})

test('handleClickEnable preserves state properties', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    description: 'Test Description',
    extensionId: 'test-extension-id',
    hasColorTheme: true,
    name: 'Test Extension',
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      /**/
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('Test Description')
  expect(result.hasColorTheme).toBe(true)
  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(false)
})

test('handleClickEnable with hasColorTheme true adds SetColorTheme button', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: true,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      /**/
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result.disabled).toBe(false)
  expect(result.buttons.length).toBe(3)
  expect(result.buttons.some((button) => button.name === 'SetColorTheme')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.enable', 'test-extension-id'])
})

test('handleClickEnable handles extension not found', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      /**/
    },
    'ExtensionManagement.getExtension': () => {
      return undefined
    },
  })

  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBeUndefined()
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.enable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('handleClickEnable handles error with Error object', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const error = new Error('Enable failed')
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      /**/
    },
    'ExtensionManagement.enable': () => {
      return error
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result.extensionId).toBe('test-extension-id')
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.enable', 'test-extension-id'])
  expect(mockRpc.invocations).toContainEqual(['ConfirmPrompt.prompt', 'Error: Enable failed'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})
