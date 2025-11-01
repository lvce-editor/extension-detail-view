import { expect, test } from '@jest/globals'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as GetFolderSize from '../src/parts/GetFolderSize/GetFolderSize.ts'

test('get folder size', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.getFolderSize': () => {
      return '1.2 MB'
    },
  })
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe('1.2 MB')
  expect(mockRpc.invocations).toEqual([['FileSystem.getFolderSize', '/test/path']])
})

test('get folder size - error case', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.getFolderSize': () => {
      throw new Error('access denied')
    },
  })
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe(0)
  expect(mockRpc.invocations).toEqual([['FileSystem.getFolderSize', '/test/path']])
})

test('get folder size - missing uri', async () => {
  const uri = ''
  await expect(GetFolderSize.getFolderSize(uri)).rejects.toThrow(new Error('uri is required'))
})
