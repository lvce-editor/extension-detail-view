import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as HandleContentsClick from '../src/parts/HandleContentsClick/HandleContentsClick.ts'

const createState = (overrides: Partial<ExtensionDetailState> = {}): ExtensionDetailState => ({
  ...createDefaultState(),
  contentEntries: [
    { depth: 0, name: 'src', type: DirentType.Directory, uri: 'file:///extension/src' },
    { depth: 0, name: 'README.md', type: DirentType.File, uri: 'file:///extension/README.md' },
  ],
  contentsEnabled: true,
  ...overrides,
})

test('selects a file and preserves literal content', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({ 'FileSystem.readFile': () => '<h1># readme</h1>' })
  const result = await HandleContentsClick.handleContentsClick(createState(), 'file:///extension/README.md')
  expect(result).toMatchObject({
    contentFileContent: '<h1># readme</h1>',
    contentSelectedUri: 'file:///extension/README.md',
  })
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'file:///extension/README.md']])
})

test('shows a read error when a file cannot be read', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw new Error('read failed')
    },
  })
  const result = await HandleContentsClick.handleContentsClick(createState(), 'file:///extension/README.md')
  expect(result).toMatchObject({ contentError: 'Error: read failed', contentFileContent: '' })
  expect(mockRpc.invocations).toHaveLength(1)
})

test('expands a directory and inserts sorted children', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => [
      { name: 'index.js', type: DirentType.File },
      { name: 'nested', type: DirentType.Directory },
    ],
  })
  const result = await HandleContentsClick.handleContentsClick(createState(), 'file:///extension/src')
  expect(result.contentExpandedUris).toEqual(['file:///extension/src'])
  expect(result.contentEntries.map((entry) => entry.name)).toEqual(['src', 'nested', 'index.js', 'README.md'])
  expect(mockRpc.invocations).toHaveLength(1)
})

test('collapses an expanded directory and removes descendants', async () => {
  const state = createState({
    contentEntries: [
      { depth: 0, name: 'src', type: DirentType.Directory, uri: 'file:///extension/src' },
      { depth: 1, name: 'index.js', type: DirentType.File, uri: 'file:///extension/src/index.js' },
      { depth: 0, name: 'README.md', type: DirentType.File, uri: 'file:///extension/README.md' },
    ],
    contentExpandedUris: ['file:///extension/src'],
  })
  const result = await HandleContentsClick.handleContentsClick(state, 'file:///extension/src')
  expect(result.contentEntries.map((entry) => entry.name)).toEqual(['src', 'README.md'])
  expect(result.contentExpandedUris).toEqual([])
})

test('keeps the tree usable when a directory cannot be read', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      throw new Error('directory failed')
    },
  })
  const state = createState()
  const result = await HandleContentsClick.handleContentsClick(state, 'file:///extension/src')
  expect(result).toMatchObject({ contentEntries: state.contentEntries, contentError: 'Error: directory failed' })
  expect(mockRpc.invocations).toHaveLength(1)
})

test('ignores unknown content entries', async () => {
  const state = createState()
  await expect(HandleContentsClick.handleContentsClick(state, 'file:///extension/missing')).resolves.toBe(state)
})
