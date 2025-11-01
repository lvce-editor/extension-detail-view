import { expect, test } from '@jest/globals'
import * as ExtensionManagement from '../src/parts/ExtensionManagement/ExtensionManagement.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('getExtension - successful getExtension', async () => {
  const mockExtension: any = { id: 'test-id', name: 'Test Extension' }
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      return mockExtension
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toEqual(mockExtension)
})

test('getExtension - fallback to getAllExtensions when getExtension fails', async () => {
  const mockExtensions: any[] = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
    'ExtensionManagement.getAllExtensions': () => {
      return mockExtensions
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toEqual({ id: 'test-id', name: 'Test Extension' })
})

test('getExtension - web platform returns undefined', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Web)
  expect(result).toBeUndefined()
})

test('getExtension - not found in fallback', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
    'ExtensionManagement.getAllExtensions': () => {
      return []
    },
  })
  const result: any = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toBeUndefined()
})

test('getExtension - both getExtension and getAllExtensions fail', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
    'ExtensionManagement.getAllExtensions': () => {
      throw new Error('getAllExtensions failed')
    },
  })
  await expect(ExtensionManagement.getExtension('test-id', PlatformType.Electron)).rejects.toThrow('getAllExtensions failed')
})

test('getExtension - remote platform with fallback', async () => {
  const mockExtensions: any[] = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.getExtension': () => {
      throw new Error('getExtension failed')
    },
    'ExtensionManagement.getAllExtensions': () => {
      return mockExtensions
    },
  })
  const result: any = await ExtensionManagement.getExtension('other-id', PlatformType.Remote)
  expect(result).toEqual({ id: 'other-id', name: 'Other Extension' })
})
