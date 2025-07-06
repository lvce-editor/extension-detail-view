import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as GetFolderSize from '../src/parts/GetFolderSize/GetFolderSize.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

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
  RendererWorker.set(mockRpc)
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe('1.2 MB')
})

test('get folder size - error case', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error('access denied')
    },
  })
  RendererWorker.set(mockRpc)
  expect(await GetFolderSize.getFolderSize('/test/path')).toBe(0)
})
