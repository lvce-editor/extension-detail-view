import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ErrorCodes from '../src/parts/ErrorCodes/ErrorCodes.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as LoadChangelogContent from '../src/parts/LoadChangelogContent/LoadChangelogContent.ts'

test('loadChangelogContent successfully loads changelog', async () => {
  const changelogContent = '# Changelog\n\n## Version 1.0.0\n- Initial release'
  const mockRpc = FileSystemWorker.registerMockRpc({
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
  const invoke = jest.fn<(...args: readonly any[]) => Promise<any>>().mockRejectedValue(enoentError)
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  FileSystemWorker.set(mockRpc)

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/extension/CHANGELOG.md']])
})

test.skip('loadChangelogContent returns error message for other errors', async () => {
  // @ts-ignore
  const consoleErrorSpy = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {})
  const error = new Error('Permission denied')
  const invoke = jest.fn<(...args: readonly any[]) => Promise<any>>().mockRejectedValue(error)
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  FileSystemWorker.set(mockRpc)

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
  expect(result).toBe('Error: Permission denied')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/test/extension/CHANGELOG.md']])
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.stringContaining('Failed to load Changelog content'),
    }),
  )
  consoleErrorSpy.mockRestore()
})

test('loadChangelogContent handles different path formats', async () => {
  const mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'changelog content'
    },
  })

  await LoadChangelogContent.loadChangelogContent('extension-name')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'extension-name/CHANGELOG.md']])

  await LoadChangelogContent.loadChangelogContent('/absolute/path')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', '/absolute/path/CHANGELOG.md']])
})
