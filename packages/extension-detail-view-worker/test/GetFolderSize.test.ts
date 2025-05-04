import { beforeEach, expect, jest, test } from '@jest/globals'
import * as GetFolderSize from '../src/parts/GetFolderSize/GetFolderSize.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

beforeEach(() => {
  jest.resetAllMocks()
})

test('get folder size', async () => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockImplementation(() => {
    return '1.2 MB'
  })
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe('1.2 MB')
  expect(mockRpc.invoke).toHaveBeenCalledWith('FileSystem.getFolderSize', '/test/path')
})

test('get folder size - error case', async () => {
  ParentRpc.set(mockRpc)
  mockRpc.invoke.mockRejectedValue(new Error('access denied'))
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe(0)
})
