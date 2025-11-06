import { test, expect } from '@jest/globals'
import type { RuntimeStatus } from '../src/parts/RuntimeStatus/RuntimeStatus.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { getRuntimeStatusDetails } from '../src/parts/FeatureRuntimeStatusDetails/FeatureRuntimeStatusDetails.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('getRuntimeStatusDetails should return runtime status details for extension', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    id: 'test-extension',
    activationEvent: 'onStartupFinished',
    status: RuntimeStatusType.Activated,
    activationTime: 150.75,
    importTime: 0,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const extension = {
    id: 'test-extension',
    name: 'Test Extension',
  }

  const result = await getRuntimeStatusDetails(extension)

  expect(result).toEqual({
    wasActivatedByEvent: 'onStartupFinished',
    activationTime: 150.75,
    status: RuntimeStatusType.Activated,
    importTime: 0,
  })
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'test-extension']])
})

test('getRuntimeStatusDetails should handle different activation events', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    id: 'another-extension',
    activationEvent: 'onCommand:test.command',
    status: RuntimeStatusType.Activating,
    activationTime: 200,
    importTime: 0,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const extension = {
    id: 'another-extension',
    name: 'Another Extension',
  }

  const result = await getRuntimeStatusDetails(extension)

  expect(result).toEqual({
    wasActivatedByEvent: 'onCommand:test.command',
    activationTime: 200,
    status: RuntimeStatusType.Activating,
    importTime: 0,
  })
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'another-extension']])
})

test('getRuntimeStatusDetails should handle error status', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    id: 'error-extension',
    activationEvent: '',
    status: RuntimeStatusType.Error,
    activationTime: 0,
    importTime: 0,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const extension = {
    id: 'error-extension',
    name: 'Error Extension',
  }

  const result = await getRuntimeStatusDetails(extension)

  expect(result).toEqual({
    wasActivatedByEvent: '',
    activationTime: 0,
    status: RuntimeStatusType.Error,
    importTime: 0,
  })
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'error-extension']])
})

test('getRuntimeStatusDetails should propagate errors from getRuntimeStatus', async () => {
  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      throw new Error('Runtime status error')
    },
  })

  const extension = {
    id: 'failing-extension',
    name: 'Failing Extension',
  }

  await expect(getRuntimeStatusDetails(extension)).rejects.toThrow('Runtime status error')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'failing-extension']])
})
