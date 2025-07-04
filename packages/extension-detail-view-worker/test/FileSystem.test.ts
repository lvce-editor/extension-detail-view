import { expect, test, jest } from '@jest/globals'

jest.unstable_mockModule('../src/parts/RendererWorker/RendererWorker.ts', () => ({
  invoke: jest.fn(),
}))

const mockRendererWorker = await import('../src/parts/RendererWorker/RendererWorker.ts')
const FileSystem = await import('../src/parts/FileSystem/FileSystem.ts')

test('readFile invokes RendererWorker with correct arguments', async () => {
  // @ts-ignore
  mockRendererWorker.invoke.mockResolvedValue('file content')
  const content = await FileSystem.readFile('/test/file.txt')
  expect(content).toBe('file content')
  expect(mockRendererWorker.invoke).toHaveBeenCalledWith('FileSystem.readFile', '/test/file.txt')
})

test('readFile propagates errors', async () => {
  const error = new Error('read error')
  // @ts-ignore
  mockRendererWorker.invoke.mockRejectedValue(error)
  await expect(FileSystem.readFile('/test/file.txt')).rejects.toThrow('read error')
})

test('readFile handles empty file', async () => {
  // @ts-ignore
  mockRendererWorker.invoke.mockResolvedValue('')
  const content = await FileSystem.readFile('/test/empty.txt')
  expect(content).toBe('')
})
