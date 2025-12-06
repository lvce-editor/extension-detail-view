import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as UpdateExtensionStatus from '../src/parts/UpdateExtensionStatus/UpdateExtensionStatus.ts'

test('updateExtensionStatus - successful update with enabled extension', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const updateFunction: UpdateExtensionStatus.UpdateFunction = async () => {
    return null
  }

  const result = await UpdateExtensionStatus.updateExtensionStatus(state, updateFunction)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(false)
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('updateExtensionStatus - successful update with disabled extension', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: true, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const updateFunction: UpdateExtensionStatus.UpdateFunction = async () => {
    return null
  }

  const result = await UpdateExtensionStatus.updateExtensionStatus(state, updateFunction)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(true)
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Enable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('updateExtensionStatus - handles error from updateFunction', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const errorMessage = 'Failed to update extension'
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      /**/
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const updateFunction: UpdateExtensionStatus.UpdateFunction = async () => {
    return errorMessage
  }

  const result = await UpdateExtensionStatus.updateExtensionStatus(state, updateFunction)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBe(false)
  expect(mockRpc.invocations).toContainEqual(['ConfirmPrompt.prompt', errorMessage])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('updateExtensionStatus - extension not found (undefined)', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return undefined
    },
  })

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const updateFunction: UpdateExtensionStatus.UpdateFunction = async () => {
    return null
  }

  const result = await UpdateExtensionStatus.updateExtensionStatus(state, updateFunction)

  expect(result.extensionId).toBe('test-extension-id')
  expect(result.disabled).toBeUndefined()
  expect(result.buttons.length).toBe(2)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('updateExtensionStatus - preserves state properties', async () => {
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
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const updateFunction: UpdateExtensionStatus.UpdateFunction = async () => {
    return null
  }

  const result = await UpdateExtensionStatus.updateExtensionStatus(state, updateFunction)

  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('Test Description')
  expect(result.hasColorTheme).toBe(true)
  expect(result.extensionId).toBe('test-extension-id')
})

test('updateExtensionStatus - with hasColorTheme true and disabled false', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: true,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const updateFunction: UpdateExtensionStatus.UpdateFunction = async () => {
    return null
  }

  const result = await UpdateExtensionStatus.updateExtensionStatus(state, updateFunction)

  expect(result.disabled).toBe(false)
  expect(result.buttons.length).toBe(3)
  expect(result.buttons.some((button) => button.name === 'SetColorTheme')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Disable')).toBe(true)
  expect(result.buttons.some((button) => button.name === 'Uninstall')).toBe(true)
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})

test('updateExtensionStatus - error with Error object', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extensionId: 'test-extension-id',
    hasColorTheme: false,
    platform: PlatformType.Electron,
  }

  const mockExtension: any = { disabled: false, id: 'test-extension-id' }
  const error = new Error('Update failed')
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      /**/
    },
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })

  const updateFunction: UpdateExtensionStatus.UpdateFunction = async () => {
    return error
  }

  const result = await UpdateExtensionStatus.updateExtensionStatus(state, updateFunction)

  expect(result.extensionId).toBe('test-extension-id')
  expect(mockRpc.invocations).toContainEqual(['ConfirmPrompt.prompt', 'Error: Update failed'])
  expect(mockRpc.invocations).toContainEqual(['ExtensionManagement.getExtension', 'test-extension-id'])
})
