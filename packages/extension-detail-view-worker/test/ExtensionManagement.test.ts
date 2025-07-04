import { expect, test, jest } from '@jest/globals'

jest.unstable_mockModule('../src/parts/RendererWorker/RendererWorker.ts', () => ({
  invoke: jest.fn(),
}))

const mockRendererWorker = await import('../src/parts/RendererWorker/RendererWorker.ts')
const ExtensionManagement = await import('../src/parts/ExtensionManagement/ExtensionManagement.ts')
const PlatformType = await import('../src/parts/PlatformType/PlatformType.ts')

test.skip('get extension - web platform', async () => {
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Web)
  expect(result).toBeUndefined()
  // @ts-ignore
  expect(mockRendererWorker.invoke).not.toHaveBeenCalled()
})

test.skip('get extension - found', async () => {
  const mockExtensions = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  // @ts-ignore
  mockRendererWorker.invoke.mockResolvedValue(mockExtensions)
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Remote)
  expect(result).toEqual({ id: 'test-id', name: 'Test Extension' })
  // @ts-ignore
  expect(mockRendererWorker.invoke).toHaveBeenCalledWith('ExtensionManagement.getAllExtensions')
})

test.skip('get extension - not found', async () => {
  // @ts-ignore
  mockRendererWorker.invoke.mockResolvedValue([])
  const result = await ExtensionManagement.getExtension('test-id', PlatformType.Remote)
  expect(result).toBeUndefined()
  // @ts-ignore
  expect(mockRendererWorker.invoke).toHaveBeenCalledWith('ExtensionManagement.getAllExtensions')
})

test.skip('get extension - error handling', async () => {
  const error = new Error('Failed to get extensions')
  // @ts-ignore
  mockRendererWorker.invoke.mockRejectedValue(error)
  await expect(ExtensionManagement.getExtension('test-id', PlatformType.Remote)).rejects.toThrow('Failed to get extensions')
})
