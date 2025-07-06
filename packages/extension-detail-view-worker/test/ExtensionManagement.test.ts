import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as ExtensionManagement from '../src/parts/ExtensionManagement/ExtensionManagement.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test.skip('get extension - web platform', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Web)
  expect(result).toBeUndefined()
  expect(invoke).not.toHaveBeenCalled()
})

test.skip('get extension - found', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const mockExtensions = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  invoke.mockResolvedValue(mockExtensions)
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Remote)
  expect(result).toEqual({ id: 'test-id', name: 'Test Extension' })
  expect(invoke).toHaveBeenCalledWith('ExtensionManagement.getAllExtensions')
})

test.skip('get extension - not found', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValue([])
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Remote)
  expect(result).toBeUndefined()
  expect(invoke).toHaveBeenCalledWith('ExtensionManagement.getAllExtensions')
})

test.skip('get extension - error handling', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const error = new Error('Failed to get extensions')
  invoke.mockRejectedValue(error)
  await expect(ExtensionManagement.getExtension('test-id', PlatformType.Remote)).rejects.toThrow('Failed to get extensions')
})
