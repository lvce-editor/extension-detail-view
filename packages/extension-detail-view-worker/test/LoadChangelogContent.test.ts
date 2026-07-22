import { expect, test, jest } from '@jest/globals'
import * as ErrorCodes from '../src/parts/ErrorCodes/ErrorCodes.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LoadChangelogContent from '../src/parts/LoadChangelogContent/LoadChangelogContent.ts'

test('loadChangelogContent successfully loads changelog', async () => {
  const changelogContent = '# Changelog\n\n## Version 1.0.0\n- Initial release'
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return changelogContent
    },
  })

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
  expect(result).toBe(changelogContent)
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/extension/CHANGELOG.md']])
})

test('loadChangelogContent uses cached content without reading the file', async () => {
  const cache = {
    get: jest.fn<(uri: string) => Promise<string | undefined>>().mockResolvedValue('# Cached changelog'),
    set: jest.fn<(uri: string, value: string) => Promise<void>>(),
  }
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw new Error('unexpected read')
    },
  })

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension', cache)

  expect(result).toBe('# Cached changelog')
  expect(cache.get).toHaveBeenCalledWith('/test/extension/CHANGELOG.md')
  expect(cache.set).not.toHaveBeenCalled()
  expect(mockRpc.invocations).toEqual([])
})

test('loadChangelogContent caches content after reading the file', async () => {
  const cache = {
    get: jest.fn<(uri: string) => Promise<string | undefined>>().mockResolvedValue(undefined),
    set: jest.fn<(uri: string, value: string) => Promise<void>>().mockResolvedValue(undefined),
  }
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return '# Network changelog'
    },
  })

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension', cache)

  expect(result).toBe('# Network changelog')
  expect(cache.get).toHaveBeenCalledWith('/test/extension/CHANGELOG.md')
  expect(cache.set).toHaveBeenCalledWith('/test/extension/CHANGELOG.md', '# Network changelog')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/extension/CHANGELOG.md']])
})

test('loadChangelogContent returns empty string when file not found', async () => {
  const enoentError = new Error('File not found')
  ;(enoentError as any).code = ErrorCodes.ENOENT
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw enoentError
    },
  })

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/extension/CHANGELOG.md']])
})

test('loadChangelogContent returns error message for other errors', async () => {
  const error = new Error('Permission denied')
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      throw error
    },
  })

  // @ts-ignore TODO
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  try {
    const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
    expect(result).toBe('Error: Permission denied')
    expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/extension/CHANGELOG.md']])
    expect(spy).toHaveBeenCalledTimes(1)
  } finally {
    spy.mockRestore()
  }
})

test('loadChangelogContent handles different path formats', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'changelog content'
    },
  })

  await LoadChangelogContent.loadChangelogContent('extension-name')
  await LoadChangelogContent.loadChangelogContent('/absolute/path')
  expect(mockRpc.invocations).toEqual([
    ['FileSystem.readFile', 'extension-name/CHANGELOG.md'],
    ['FileSystem.readFile', '/absolute/path/CHANGELOG.md'],
  ])
})
