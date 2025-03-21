import { expect, test, jest } from '@jest/globals'

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => ({
  invoke: jest.fn(),
}))

const mockParentRpc = await import('../src/parts/ParentRpc/ParentRpc.ts')
const FileSystem = await import('../src/parts/FileSystem/FileSystem.ts')

test('readFile invokes ParentRpc with correct arguments', async () => {
  // @ts-ignore
  mockParentRpc.invoke.mockResolvedValue('file content')
  const content = await FileSystem.readFile('/test/file.txt')
  expect(content).toBe('file content')
  expect(mockParentRpc.invoke).toHaveBeenCalledWith('FileSystem.readFile', '/test/file.txt')
})

test('readFile propagates errors', async () => {
  const error = new Error('read error')
  // @ts-ignore
  mockParentRpc.invoke.mockRejectedValue(error)
  await expect(FileSystem.readFile('/test/file.txt')).rejects.toThrow('read error')
})

test('readFile handles empty file', async () => {
  // @ts-ignore
  mockParentRpc.invoke.mockResolvedValue('')
  const content = await FileSystem.readFile('/test/empty.txt')
  expect(content).toBe('')
})
