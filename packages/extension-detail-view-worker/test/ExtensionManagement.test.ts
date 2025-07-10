import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ExtensionManagement from '../src/parts/ExtensionManagement/ExtensionManagement.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('getExtension - successful getExtension', async () => {
  const mockExtension = { id: 'test-id', name: 'Test Extension' }
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, id: string) => {
      if (method === 'ExtensionManagement.getExtension') {
        return mockExtension
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toEqual(mockExtension)
})

test('getExtension - fallback to getAllExtensions when getExtension fails', async () => {
  const mockExtensions = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        throw new Error('getExtension failed')
      }
      if (method === 'ExtensionManagement.getAllExtensions') {
        return mockExtensions
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toEqual({ id: 'test-id', name: 'Test Extension' })
})

test('getExtension - web platform returns undefined', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionManagement.getExtension') {
        throw new Error('getExtension failed')
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Web)
  expect(result).toBeUndefined()
})

test('getExtension - not found in fallback', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        throw new Error('getExtension failed')
      }
      if (method === 'ExtensionManagement.getAllExtensions') {
        return []
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Electron)
  expect(result).toBeUndefined()
})

test('getExtension - both getExtension and getAllExtensions fail', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionManagement.getExtension') {
        throw new Error('getExtension failed')
      }
      if (method === 'ExtensionManagement.getAllExtensions') {
        throw new Error('getAllExtensions failed')
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)
  await expect(ExtensionManagement.getExtension('test-id', PlatformType.Electron)).rejects.toThrow('getAllExtensions failed')
})

test('getExtension - remote platform with fallback', async () => {
  const mockExtensions = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.getExtension') {
        throw new Error('getExtension failed')
      }
      if (method === 'ExtensionManagement.getAllExtensions') {
        return mockExtensions
      }
      throw new Error('unexpected method')
    },
  })
  RendererWorker.set(mockRpc)
  const result = await ExtensionManagement.getExtension('other-id', PlatformType.Remote)
  expect(result).toEqual({ id: 'other-id', name: 'Other Extension' })
})
