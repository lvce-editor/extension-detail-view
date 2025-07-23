import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { RuntimeStatus } from '../src/parts/RuntimeStatus/RuntimeStatus.ts'
import * as ExtensionHostWorker from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { getRuntimeStatus } from '../src/parts/GetRuntimeStatus/GetRuntimeStatus.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('getRuntimeStatus should return runtime status from ExtensionHostWorker', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    id: 'test-extension',
    activationEvent: 'onStartupFinished',
    status: RuntimeStatusType.Activated,
    activationTime: 1_234_567_890,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, extensionId: string) => {
      if (method === 'ExtensionHost.getRuntimeStatus' && extensionId === 'test-extension') {
        return mockRuntimeStatus
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  ExtensionHostWorker.set(mockRpc)

  const result = await getRuntimeStatus('test-extension')

  expect(result).toEqual(mockRuntimeStatus)
  expect(result.id).toBe('test-extension')
  expect(result.activationEvent).toBe('onStartupFinished')
  expect(result.status).toBe(RuntimeStatusType.Activated)
  expect(result.activationTime).toBe(1_234_567_890)
})

test('getRuntimeStatus should handle different extension IDs', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    id: 'another-extension',
    activationEvent: 'onCommand',
    status: RuntimeStatusType.Error,
    activationTime: 9_876_543_210,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, extensionId: string) => {
      if (method === 'ExtensionHost.getRuntimeStatus' && extensionId === 'another-extension') {
        return mockRuntimeStatus
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  ExtensionHostWorker.set(mockRpc)

  const result = await getRuntimeStatus('another-extension')

  expect(result).toEqual(mockRuntimeStatus)
  expect(result.id).toBe('another-extension')
  expect(result.activationEvent).toBe('onCommand')
  expect(result.status).toBe(RuntimeStatusType.Error)
  expect(result.activationTime).toBe(9_876_543_210)
})

test('getRuntimeStatus should propagate errors from ExtensionHostWorker', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, extensionId: string) => {
      throw new Error('Extension host error')
    },
  })

  ExtensionHostWorker.set(mockRpc)

  await expect(getRuntimeStatus('test-extension')).rejects.toThrow('Extension host error')
})
