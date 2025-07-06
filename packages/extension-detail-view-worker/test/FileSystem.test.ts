import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as FileSystem from '../src/parts/FileSystem/FileSystem.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test.skip('readFile invokes RendererWorker with correct arguments', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValue('file content')
  const content = await FileSystem.readFile('/test/file.txt')
  expect(content).toBe('file content')
  expect(invoke).toHaveBeenCalledWith('FileSystem.readFile', '/test/file.txt')
})

test.skip('readFile propagates errors', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const error = new Error('read error')
  invoke.mockRejectedValue(error)
  await expect(FileSystem.readFile('/test/file.txt')).rejects.toThrow('read error')
})

test.skip('readFile handles empty file', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValue('')
  const content = await FileSystem.readFile('/test/empty.txt')
  expect(content).toBe('')
})
