import { test, expect } from '@jest/globals'
import type { RuntimeStatus } from '../src/parts/RuntimeStatus/RuntimeStatus.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { getRuntimeStatus } from '../src/parts/GetRuntimeStatus/GetRuntimeStatus.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('getRuntimeStatus should return runtime status from ExtensionHostWorker', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    activationEvent: 'onStartupFinished',
    activationTime: 1_234_567_890,
    id: 'test-extension',
    importTime: 0,
    status: RuntimeStatusType.Activated,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const result = await getRuntimeStatus('test-extension')

  expect(result).toEqual(mockRuntimeStatus)
  expect(result.id).toBe('test-extension')
  expect(result.activationEvent).toBe('onStartupFinished')
  expect(result.status).toBe(RuntimeStatusType.Activated)
  expect(result.activationTime).toBe(1_234_567_890)
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'test-extension']])
})

test('getRuntimeStatus should handle different extension IDs', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    activationEvent: 'onCommand',
    activationTime: 9_876_543_210,
    id: 'another-extension',
    importTime: 0,
    status: RuntimeStatusType.Error,
  }

  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      return mockRuntimeStatus
    },
  })

  const result = await getRuntimeStatus('another-extension')

  expect(result).toEqual(mockRuntimeStatus)
  expect(result.id).toBe('another-extension')
  expect(result.activationEvent).toBe('onCommand')
  expect(result.status).toBe(RuntimeStatusType.Error)
  expect(result.activationTime).toBe(9_876_543_210)
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'another-extension']])
})

test('getRuntimeStatus should propagate errors from ExtensionHostWorker', async () => {
  const mockRpc = ExtensionHostWorker.registerMockRpc({
    'ExtensionHost.getRuntimeStatus': () => {
      throw new Error('Extension host error')
    },
  })

  await expect(getRuntimeStatus('test-extension')).rejects.toThrow('Extension host error')
  expect(mockRpc.invocations).toEqual([['ExtensionHost.getRuntimeStatus', 'test-extension']])
})
