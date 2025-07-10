import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as LoadChangelogContent from '../src/parts/LoadChangelogContent/LoadChangelogContent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as ErrorCodes from '../src/parts/ErrorCodes/ErrorCodes.ts'

test('loadChangelogContent successfully loads changelog', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const changelogContent = '# Changelog\n\n## Version 1.0.0\n- Initial release'
  invoke.mockResolvedValue(changelogContent)

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
  expect(result).toBe(changelogContent)
  expect(invoke).toHaveBeenCalledWith('FileSystem.readFile', '/test/extension/CHANGELOG.md')
})

test('loadChangelogContent returns empty string when file not found', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const enoentError = new Error('File not found')
  ;(enoentError as any).code = ErrorCodes.ENOENT
  invoke.mockRejectedValue(enoentError)

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
  expect(result).toBe('')
  expect(invoke).toHaveBeenCalledWith('FileSystem.readFile', '/test/extension/CHANGELOG.md')
})

test('loadChangelogContent returns error message for other errors', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const error = new Error('Permission denied')
  invoke.mockRejectedValue(error)

  const result = await LoadChangelogContent.loadChangelogContent('/test/extension')
  expect(result).toBe('Error: Permission denied')
  expect(invoke).toHaveBeenCalledWith('FileSystem.readFile', '/test/extension/CHANGELOG.md')
})

test('loadChangelogContent handles different path formats', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValue('changelog content')

  await LoadChangelogContent.loadChangelogContent('extension-name')
  expect(invoke).toHaveBeenCalledWith('FileSystem.readFile', 'extension-name/CHANGELOG.md')

  await LoadChangelogContent.loadChangelogContent('/absolute/path')
  expect(invoke).toHaveBeenCalledWith('FileSystem.readFile', '/absolute/path/CHANGELOG.md')
})