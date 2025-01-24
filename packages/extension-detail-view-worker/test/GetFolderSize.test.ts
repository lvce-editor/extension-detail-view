import { beforeEach, expect, jest, test } from '@jest/globals'
import * as GetFolderSize from '../src/parts/GetFolderSize/GetFolderSize.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  jest.resetAllMocks()
})

test('get folder size', async () => {
  RpcRegistry.set(1, mockRpc)
  mockRpc.invoke.mockImplementation(() => {
    return '1.2 MB'
  })
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe('1.2 MB')
  expect(mockRpc.invoke).toHaveBeenCalledWith('GetFolderSize.getFolderSize', '/test/path')
})

test('get folder size - error case', async () => {
  RpcRegistry.set(1, mockRpc)
  mockRpc.invoke.mockRejectedValue(new Error('access denied'))
  await expect(GetFolderSize.getFolderSize('/test/path')).rejects.toThrow(new Error('access denied'))
})
