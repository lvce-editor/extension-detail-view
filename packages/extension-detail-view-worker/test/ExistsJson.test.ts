import { beforeEach, expect, jest, test } from '@jest/globals'
import { existsJson } from '../src/parts/ExistsJson/ExistsJson.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'

let mockFetch: jest.MockedFunction<typeof fetch>

beforeEach(() => {
  mockFetch = jest.fn<typeof fetch>()
  globalThis.fetch = mockFetch
})

test('uses the file system for file urls', async () => {
  using mockRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.exists': () => true,
  })
  const schemaUrl = 'file:///extensions/builtin.language-features-typescript/schemas/tsconfig.schema.json'

  await expect(existsJson(schemaUrl)).resolves.toBe(true)
  expect(mockRpc.invocations).toEqual([['FileSystem.exists', schemaUrl]])
  expect(mockFetch).not.toHaveBeenCalled()
})

test.each(['http://example.com/schema.json', 'https://example.com/schema.json'])('uses fetch for %s', async (schemaUrl) => {
  mockFetch.mockResolvedValueOnce({ ok: true } as Response)

  await expect(existsJson(schemaUrl)).resolves.toBe(true)
  expect(mockFetch).toHaveBeenCalledWith(schemaUrl, { method: 'HEAD' })
})

test.each(['ftp://example.com/schema.json', 'not a url'])('does not fetch unsupported url %s', async (schemaUrl) => {
  await expect(existsJson(schemaUrl)).resolves.toBe(false)
  expect(mockFetch).not.toHaveBeenCalled()
})
