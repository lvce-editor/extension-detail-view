import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as GetFolderSize from '../src/parts/GetFolderSize/GetFolderSize.ts'

test('get folder size', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.getFolderSize') {
        return '1.2 MB'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockRpc)
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe('1.2 MB')
})

test('get folder size - error case', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error('access denied')
    },
  })
  FileSystemWorker.set(mockRpc)
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe(0)
})

test('get folder size - missing uri', async () => {
  const uri = ''
  await expect(GetFolderSize.getFolderSize(uri)).rejects.toThrow(new Error('uri is required'))
})
