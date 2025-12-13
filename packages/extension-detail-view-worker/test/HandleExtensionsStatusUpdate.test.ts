import { test, expect } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { RuntimeStatus } from '../src/parts/RuntimeStatus/RuntimeStatus.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { handleExtensionsStatusUpdate } from '../src/parts/HandleExtensionsStatusUpdate/HandleExtensionsStatusUpdate.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('handleExtensionsStatusUpdate should update state with runtime status details', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    activationEvent: 'onStartupFinished',
    activationTime: 150.75,
    id: 'test-extension',
    importTime: 10.5,
    status: RuntimeStatusType.Activated,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'test-extension',
      name: 'Test Extension',
    },
  }

  const result = await handleExtensionsStatusUpdate(state)

  expect(result.activationTime).toBe(150.75)
  expect(result.importTime).toBe(10.5)
  expect(result.status).toBe(RuntimeStatusType.Activated)
  expect(result.wasActivatedByEvent).toBe('onStartupFinished')
  expect(result.extension).toBe(state.extension)
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'test-extension']])
})

test('handleExtensionsStatusUpdate should handle different activation events', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    activationEvent: 'onCommand:test.command',
    activationTime: 200,
    id: 'another-extension',
    importTime: 5,
    status: RuntimeStatusType.Activating,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'another-extension',
      name: 'Another Extension',
    },
  }

  const result = await handleExtensionsStatusUpdate(state)

  expect(result.activationTime).toBe(200)
  expect(result.importTime).toBe(5)
  expect(result.status).toBe(RuntimeStatusType.Activating)
  expect(result.wasActivatedByEvent).toBe('onCommand:test.command')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'another-extension']])
})

test('handleExtensionsStatusUpdate should handle error status', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    activationEvent: '',
    activationTime: 0,
    id: 'error-extension',
    importTime: 0,
    status: RuntimeStatusType.Error,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'error-extension',
      name: 'Error Extension',
    },
  }

  const result = await handleExtensionsStatusUpdate(state)

  expect(result.activationTime).toBe(0)
  expect(result.importTime).toBe(0)
  expect(result.status).toBe(RuntimeStatusType.Error)
  expect(result.wasActivatedByEvent).toBe('')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'error-extension']])
})

test('handleExtensionsStatusUpdate should preserve other state properties', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    activationEvent: 'onStartupFinished',
    activationTime: 100,
    id: 'test-extension',
    importTime: 20,
    status: RuntimeStatusType.Activated,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    description: 'Custom Description',
    extension: {
      id: 'test-extension',
      name: 'Test Extension',
    },
    extensionId: 'test-extension',
    name: 'Custom Name',
  }

  const result = await handleExtensionsStatusUpdate(state)

  expect(result.name).toBe('Custom Name')
  expect(result.description).toBe('Custom Description')
  expect(result.extensionId).toBe('test-extension')
  expect(result.activationTime).toBe(100)
  expect(result.importTime).toBe(20)
  expect(result.status).toBe(RuntimeStatusType.Activated)
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'test-extension']])
})

test('handleExtensionsStatusUpdate should propagate errors from getRuntimeStatus', async () => {
  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      throw new Error('Runtime status error')
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'failing-extension',
      name: 'Failing Extension',
    },
  }

  await expect(handleExtensionsStatusUpdate(state)).rejects.toThrow('Runtime status error')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'failing-extension']])
})

