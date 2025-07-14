import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as LoadReadmeContent from '../src/parts/LoadReadmeContent/LoadReadmeContent.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('loads readme content', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValue('# Test Content')
  const content = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(content).toBe('# Test Content')
  expect(invoke).toHaveBeenCalledWith('FileSystem.readFile', '/test/path/README.md')
})

test('handles missing readme file', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const error = new Error('file not found')
  ;(error as any).code = 'ENOENT'
  invoke.mockRejectedValue(error)
  const content = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(content).toBe('')
})

test('returns error message for other errors', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  // @ts-ignore TODO
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const error = new Error('permission denied')
  invoke.mockRejectedValue(error)
  const content = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(content).toBe('Error: permission denied')
  expect(spy).toHaveBeenCalledTimes(1)
})

test('handles empty readme file', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValue('')
  const content = await LoadReadmeContent.loadReadmeContent('/test/path/README.md')
  expect(content).toBe('')
})
