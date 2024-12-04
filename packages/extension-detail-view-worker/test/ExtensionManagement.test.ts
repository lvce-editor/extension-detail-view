import { expect, test, jest } from '@jest/globals'

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => ({
  invoke: jest.fn(),
}))

const mockParentRpc = await import('../src/parts/ParentRpc/ParentRpc.ts')
const ExtensionManagement = await import('../src/parts/ExtensionManagement/ExtensionManagement.ts')

test('get extension - web platform', async () => {
  const result = await ExtensionManagement.getExtension('test-id', /* PlatformType.Web */ 2)
  expect(result).toBeUndefined()
  // @ts-ignore
  expect(mockParentRpc.invoke).not.toHaveBeenCalled()
})

test('get extension - found', async () => {
  const mockExtensions = [
    { id: 'test-id', name: 'Test Extension' },
    { id: 'other-id', name: 'Other Extension' },
  ]
  // @ts-ignore
  mockParentRpc.invoke.mockResolvedValue(mockExtensions)
  const result = await ExtensionManagement.getExtension('test-id', /* PlatformType.Remote */ 1)
  expect(result).toEqual({ id: 'test-id', name: 'Test Extension' })
  // @ts-ignore
  expect(mockParentRpc.invoke).toHaveBeenCalledWith('ExtensionManagement.getAllExtensions')
})

test('get extension - not found', async () => {
  // @ts-ignore
  mockParentRpc.invoke.mockResolvedValue([])
  const result = await ExtensionManagement.getExtension('test-id', /* PlatformType.Remote */ 1)
  expect(result).toBeUndefined()
  // @ts-ignore
  expect(mockParentRpc.invoke).toHaveBeenCalledWith('ExtensionManagement.getAllExtensions')
})

test('get extension - error handling', async () => {
  const error = new Error('Failed to get extensions')
  // @ts-ignore
  mockParentRpc.invoke.mockRejectedValue(error)
  await expect(ExtensionManagement.getExtension('test-id', /* PlatformType.Remote */ 1)).rejects.toThrow('Failed to get extensions')
})
