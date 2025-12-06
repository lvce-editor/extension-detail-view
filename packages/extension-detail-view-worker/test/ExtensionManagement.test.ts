import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ExtensionManagement from '../src/parts/ExtensionManagement/ExtensionManagement.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('getExtension - successful getExtension', async () => {
  const mockExtension: any = { id: 'test-id', name: 'Test Extension' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toEqual(mockExtension)
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-id']])
})

test('getExtension - fallback to getAllExtensions when getExtension fails', async () => {
  const mockExtensions: any[] = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  const mockRpc = RendererWorker.registerMockRpc({
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
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Web)
  expect(result).toBeUndefined()
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.getExtension', 'test-id']])
})

test('getExtension - not found in fallback', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
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
  const mockRpc = RendererWorker.registerMockRpc({
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
  const mockRpc = RendererWorker.registerMockRpc({
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
