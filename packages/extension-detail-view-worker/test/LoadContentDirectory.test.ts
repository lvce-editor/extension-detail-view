import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LoadContentDirectory from '../src/parts/LoadContentDirectory/LoadContentDirectory.ts'

test('loads and sorts child entries', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => [
      { name: 'b.md', type: DirentType.File },
      { name: 'nested', type: DirentType.Directory },
      { name: 'a.md', type: DirentType.File },
    ],
  })
  await expect(LoadContentDirectory.loadContentDirectory('file:///extension/src', 1)).resolves.toEqual([
    { depth: 1, name: 'nested', type: DirentType.Directory, uri: 'file:///extension/src/nested' },
    { depth: 1, name: 'a.md', type: DirentType.File, uri: 'file:///extension/src/a.md' },
    { depth: 1, name: 'b.md', type: DirentType.File, uri: 'file:///extension/src/b.md' },
  ])
  expect(mockRpc.invocations).toHaveLength(1)
})
