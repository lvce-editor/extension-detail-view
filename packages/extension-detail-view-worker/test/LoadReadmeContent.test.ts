import { expect, test, jest } from '@jest/globals'

let mockFileSystem: any

jest.unstable_mockModule('../src/parts/FileSystem/FileSystem.ts', () => ({
  readFile: jest.fn(),
}))

mockFileSystem = await import('../src/parts/FileSystem/FileSystem.ts')
const LoadReadmeContent = await import('../src/parts/LoadReadmeContent/LoadReadmeContent.ts')

test('loads readme content', async () => {
  mockFileSystem.readFile.mockResolvedValue('# Test Content')
  const content = await LoadReadmeContent.loadReadmeContent('/test/path')
  expect(content).toBe('# Test Content')
  expect(mockFileSystem.readFile).toHaveBeenCalledWith('/test/path/README.md')
})

test('handles missing readme file', async () => {
  const error = new Error('file not found')
  // @ts-ignore
  error.code = 'ENOENT'
  mockFileSystem.readFile.mockRejectedValue(error)
  const content = await LoadReadmeContent.loadReadmeContent('/test/path')
  expect(content).toBe('')
})

test('returns error message for other errors', async () => {
  const error = new Error('permission denied')
  mockFileSystem.readFile.mockRejectedValue(error)
  const content = await LoadReadmeContent.loadReadmeContent('/test/path')
  expect(content).toBe('Error: permission denied')
})

test('handles empty readme file', async () => {
  mockFileSystem.readFile.mockResolvedValue('')
  const content = await LoadReadmeContent.loadReadmeContent('/test/path')
  expect(content).toBe('')
})
