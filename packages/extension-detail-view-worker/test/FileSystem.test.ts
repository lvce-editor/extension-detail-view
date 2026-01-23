import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as FileSystem from '../src/parts/FileSystem/FileSystem.ts'

test.skip('readFile invokes RendererWorker with correct arguments', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'file content'
    },
  })

  const content = await FileSystem.readFile('/test/file.txt')
  expect(content).toBe('file content')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/file.txt']])
})

test.skip('readFile propagates errors', async () => {
  const error = new Error('read error')
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw error
    },
  })

  await expect(FileSystem.readFile('/test/file.txt')).rejects.toThrow('read error')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/file.txt']])
})

test.skip('readFile handles empty file', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return ''
    },
  })

  const content = await FileSystem.readFile('/test/empty.txt')
  expect(content).toBe('')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/empty.txt']])
})
