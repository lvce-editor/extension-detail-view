import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionManagement from '../src/parts/ExtensionManagement/ExtensionManagement.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('getExtension - successful getExtension', async () => {
  const mockExtension: any = { id: 'test-id', name: 'Test Extension' }
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toEqual(mockExtension)
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-id']])
})

test('getExtension - successful extension management worker lookup', async () => {
  const extension = { id: 'test-id', name: 'Test Extension' }
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getExtension': () => {
      return extension
    },
  })

  await expect(ExtensionManagement.getExtension(extension.id, PlatformType.Web)).resolves.toEqual(extension)
  expect(mockRpc.invocations).toEqual([['Extensions.getExtension', extension.id]])
})

test('getExtension - fallback to server extension when extension management worker returns undefined', async () => {
  const serverExtension = { id: 'builtin.high-contrast-theme', name: 'High Contrast Theme' }
  using extensionManagementMockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getExtension': () => {
      return undefined
    },
  })
  using rendererMockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return serverExtension
    },
  })

  await expect(ExtensionManagement.getExtension(serverExtension.id, PlatformType.Web)).resolves.toEqual(serverExtension)
  expect(extensionManagementMockRpc.invocations).toEqual([['Extensions.getExtension', serverExtension.id]])
  expect(rendererMockRpc.invocations).toEqual([['ExtensionManagement.getExtension', serverExtension.id]])
})

test('getExtension - fallback to getAllExtensions when getExtension fails', async () => {
  const mockExtensions: any[] = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getAllExtensions': () => {
      return mockExtensions
    },
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toEqual({ id: 'test-id', name: 'Test Extension' })
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-id'], ['ExtensionManagement.getAllExtensions']])
})

test('getExtension - web platform returns undefined', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Web)
  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-id']])
})

test('getExtension - not found in fallback', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getAllExtensions': () => {
      return []
    },
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-id'], ['ExtensionManagement.getAllExtensions']])
})

test('getExtension - both getExtension and getAllExtensions fail', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getAllExtensions': () => {
      throw new Error('getAllExtensions failed')
    },
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
  })
  await expect(ExtensionManagement.getExtension('test-id', PlatformType.Electron)).rejects.toThrow('getAllExtensions failed')
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-id'], ['ExtensionManagement.getAllExtensions']])
})

test('getExtension - remote platform with fallback', async () => {
  const mockExtensions: any[] = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getAllExtensions': () => {
      return mockExtensions
    },
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
  })
  const result: any = await ExtensionManagement.getExtension('other-id', PlatformType.Remote)
  expect(result).toEqual({ id: 'other-id', name: 'Other Extension' })
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'other-id'], ['ExtensionManagement.getAllExtensions']])
})
