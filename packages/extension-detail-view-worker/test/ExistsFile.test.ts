import { expect, test } from '@jest/globals'
import { existsFile } from '../src/parts/ExistsFile/ExistsFile.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'

test('existsFile returns true when file exists', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      return true
    },
  })
  const result = await existsFile('file:///test/path')
  expect(result).toBe(true)
  expect(mockRpc.invocations).toEqual([['FileSystem.exists', 'file:///test/path']])
})

test('existsFile returns false when file does not exist', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      return false
    },
  })
  const result = await existsFile('file:///test/path')
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['FileSystem.exists', 'file:///test/path']])
})

test('existsFile returns false when FileSystem.exists throws an error', async () => {
  const error = new Error('file system error')
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => {
      throw error
    },
  })
  const result = await existsFile('file:///test/path')
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['FileSystem.exists', 'file:///test/path']])
})
