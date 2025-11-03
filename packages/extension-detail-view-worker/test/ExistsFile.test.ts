import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { existsFile } from '../src/parts/ExistsFile/ExistsFile.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'

test('existsFile returns true when file exists', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, uri: string) => {
      if (method === 'FileSystem.exists' && uri === 'file:///test/path') {
        return true
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockRpc)
  const result = await existsFile('file:///test/path')
  expect(result).toBe(true)
})

test('existsFile returns false when file does not exist', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, uri: string) => {
      if (method === 'FileSystem.exists' && uri === 'file:///test/path') {
        return false
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockRpc)
  const result = await existsFile('file:///test/path')
  expect(result).toBe(false)
})
