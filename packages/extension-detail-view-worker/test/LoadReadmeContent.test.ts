import { expect, test } from '@jest/globals'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LoadReadmeContent from '../src/parts/LoadReadmeContent/LoadReadmeContent.ts'

test('loads readme content', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '# Test Content'
    },
  })
  const content = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(content).toBe('# Test Content')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/path/README.md']])
})

test('handles missing readme file', async () => {
  const error = new Error('file not found')
  ;(error as any).code = 'ENOENT'
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw error
    },
  })
  const content = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(content).toBe('')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/path/README.md']])
})

test('returns error message for other errors', async () => {
  const error = new Error('permission denied')
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.writeFile': () => {},
    'FileSystem.readFile': () => {
      throw error
    },
  })

  const result = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(result).toBe('Error: permission denied')
  expect(mockRpc.invocations).toContainEqual([
    'FileSystem.writeFile',
    'memfs:///extension-detail-output.txt',
    expect.stringContaining('Failed to load Readme content'),
  ])
})

test('handles empty readme file', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return ''
    },
  })
  const content = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(content).toBe('')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/path/README.md']])
})
