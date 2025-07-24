import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
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

  const extension = {
    id: 'test-extension',
    name: 'Test Extension',
  }

  const result = await getRuntimeStatusDetails(extension)

  expect(result).toEqual({
    wasActivatedByEvent: 'onStartupFinished',
    activationTime: 150.75,
    status: RuntimeStatusType.Activated,
  })
})

test('getRuntimeStatusDetails should handle different activation events', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    id: 'another-extension',
    activationEvent: 'onCommand:test.command',
    status: RuntimeStatusType.Activating,
    activationTime: 200,
    importTime: 0,
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

  const extension = {
    id: 'another-extension',
    name: 'Another Extension',
  }

  const result = await getRuntimeStatusDetails(extension)

  expect(result).toEqual({
    wasActivatedByEvent: 'onCommand:test.command',
    activationTime: 200,
    status: RuntimeStatusType.Activating,
  })
})

test('getRuntimeStatusDetails should handle error status', async () => {
  const mockRuntimeStatus: RuntimeStatus = {
    id: 'error-extension',
    activationEvent: '',
    status: RuntimeStatusType.Error,
    activationTime: 0,
    importTime: 0,
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, extensionId: string) => {
      if (method === 'ExtensionHost.getRuntimeStatus' && extensionId === 'error-extension') {
        return mockRuntimeStatus
      }
      throw new Error(`unexpected method ${method}`)
    },
  })

  ExtensionHostWorker.set(mockRpc)

  const extension = {
    id: 'error-extension',
    name: 'Error Extension',
  }

  const result = await getRuntimeStatusDetails(extension)

  expect(result).toEqual({
    wasActivatedByEvent: '',
    activationTime: 0,
    status: RuntimeStatusType.Error,
  })
})

test('getRuntimeStatusDetails should propagate errors from getRuntimeStatus', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, extensionId: string) => {
      throw new Error('Runtime status error')
    },
  })

  ExtensionHostWorker.set(mockRpc)

  const extension = {
    id: 'failing-extension',
    name: 'Failing Extension',
  }

  await expect(getRuntimeStatusDetails(extension)).rejects.toThrow('Runtime status error')
})
