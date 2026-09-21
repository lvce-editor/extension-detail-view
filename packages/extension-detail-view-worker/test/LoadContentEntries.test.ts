import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LoadContentEntries from '../src/parts/LoadContentEntries/LoadContentEntries.ts'

test('loads and sorts root content entries', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => [
      { name: 'z.txt', type: DirentType.File },
      { name: 'src', type: DirentType.Directory },
      { name: 42, type: DirentType.File },
      { name: 'a.txt', type: DirentType.File },
    ],
  })
  await expect(LoadContentEntries.loadContentEntries('file:///extension')).resolves.toEqual([
    { depth: 0, name: 'src', type: DirentType.Directory, uri: 'file:///extension/src' },
    { depth: 0, name: 'a.txt', type: DirentType.File, uri: 'file:///extension/a.txt' },
    { depth: 0, name: 'z.txt', type: DirentType.File, uri: 'file:///extension/z.txt' },
  ])
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', 'file:///extension']])
})

test('propagates directory read failures', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      throw new Error('read failed')
    },
  })
  await expect(LoadContentEntries.loadContentEntries('file:///extension')).rejects.toThrow('read failed')
  expect(mockRpc.invocations).toHaveLength(1)
})
