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
