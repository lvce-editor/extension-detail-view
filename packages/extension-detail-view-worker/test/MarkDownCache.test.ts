import { expect, test, jest } from '@jest/globals'
const resetModules = (): void => {
  jest.resetModules()
}

const cacheName = 'lvce-editor/extension-readme-markdown-cache'

test('uses the application name for the markdown cache', async () => {
  resetModules()
  const cache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(undefined),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const getCache = jest.fn<(cacheName: string, bucketName: string) => Promise<typeof cache>>().mockResolvedValue(cache)
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  await MarkDownCache.has('test-app/extension-readme-markdown-cache', 'test-key', 'markdown-cache', getCache)

  expect(getCache).toHaveBeenCalledWith('test-app/extension-readme-markdown-cache', 'markdown-cache')
})

test.skip('has - returns false when storageBuckets is not supported', async () => {
  resetModules()
  const originalNavigator = globalThis.navigator
  // @ts-ignore
  globalThis.navigator = {}
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const result = await MarkDownCache.has(cacheName, 'test-key', 'markdown-cache')

  expect(result).toBe(false)
  globalThis.navigator = originalNavigator
})

test.skip('has - returns true when key exists in cache', async () => {
  resetModules()
  const mockResponse = {
    text: jest.fn<() => Promise<string>>().mockResolvedValue('cached value'),
  }
  const mockCache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(mockResponse as unknown as Response),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const mockCaches = {
    open: jest.fn<(name: string) => Promise<typeof mockCache>>().mockResolvedValue(mockCache),
  }
  const mockBucket = {
    caches: mockCaches,
  }
  const mockStorageBuckets = {
    open: jest.fn<(name: string, options?: any) => Promise<typeof mockBucket>>().mockResolvedValue(mockBucket),
  }

  const originalNavigator = globalThis.navigator
  // @ts-expect-error storageBuckets is not in WorkerNavigator type but exists in browser
  globalThis.navigator = {
    storageBuckets: mockStorageBuckets,
  } as typeof globalThis.navigator
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const result = await MarkDownCache.has(cacheName, 'test-key', 'markdown-cache')

  expect(result).toBe(true)
  expect(mockStorageBuckets.open).toHaveBeenCalledWith('markdown-cache', expect.any(Object))
  expect(mockCaches.open).toHaveBeenCalledWith('lvce-editor/extension-readme-markdown-cache')
  expect(mockCache.match).toHaveBeenCalledWith('test-key')
  globalThis.navigator = originalNavigator
})

test.skip('has - returns false when key does not exist in cache', async () => {
  resetModules()
  const mockCache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(undefined),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const mockCaches = {
    open: jest.fn<(name: string) => Promise<typeof mockCache>>().mockResolvedValue(mockCache),
  }
  const mockBucket = {
    caches: mockCaches,
  }
  const mockStorageBuckets = {
    open: jest.fn<(name: string, options?: any) => Promise<typeof mockBucket>>().mockResolvedValue(mockBucket),
  }

  const originalNavigator = globalThis.navigator
  // @ts-expect-error storageBuckets is not in WorkerNavigator type but exists in browser
  globalThis.navigator = {
    storageBuckets: mockStorageBuckets,
  } as typeof globalThis.navigator
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const result = await MarkDownCache.has(cacheName, 'non-existent-key', 'markdown-cache')

  expect(result).toBe(false)
  expect(mockCache.match).toHaveBeenCalledWith('non-existent-key')
  globalThis.navigator = originalNavigator
})

test.skip('get - returns empty string when storageBuckets is not supported', async () => {
  resetModules()
  const originalNavigator = globalThis.navigator
  // @ts-ignore
  globalThis.navigator = {}
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const result = await MarkDownCache.get(cacheName, 'test-key', 'markdown-cache')

  expect(result).toBe('')
  globalThis.navigator = originalNavigator
})

test.skip('get - returns cached value when key exists', async () => {
  resetModules()
  const cachedValue = '<p>Hello World</p>'
  const mockResponse = {
    text: jest.fn<() => Promise<string>>().mockResolvedValue(cachedValue),
  }
  const mockCache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(mockResponse as unknown as Response),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const mockCaches = {
    open: jest.fn<(name: string) => Promise<typeof mockCache>>().mockResolvedValue(mockCache),
  }
  const mockBucket = {
    caches: mockCaches,
  }
  const mockStorageBuckets = {
    open: jest.fn<(name: string, options?: any) => Promise<typeof mockBucket>>().mockResolvedValue(mockBucket),
  }

  const originalNavigator = globalThis.navigator
  // @ts-expect-error storageBuckets is not in WorkerNavigator type but exists in browser
  globalThis.navigator = {
    storageBuckets: mockStorageBuckets,
  } as typeof globalThis.navigator
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const result = await MarkDownCache.get(cacheName, 'test-key', 'markdown-cache')

  expect(result).toBe(cachedValue)
  expect(mockCache.match).toHaveBeenCalledWith('test-key')
  expect(mockResponse.text).toHaveBeenCalled()
  globalThis.navigator = originalNavigator
})

test.skip('get - returns empty string when key does not exist', async () => {
  resetModules()
  const mockCache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(undefined),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const mockCaches = {
    open: jest.fn<(name: string) => Promise<typeof mockCache>>().mockResolvedValue(mockCache),
  }
  const mockBucket = {
    caches: mockCaches,
  }
  const mockStorageBuckets = {
    open: jest.fn<(name: string, options?: any) => Promise<typeof mockBucket>>().mockResolvedValue(mockBucket),
  }

  const originalNavigator = globalThis.navigator
  // @ts-expect-error storageBuckets is not in WorkerNavigator type but exists in browser
  globalThis.navigator = {
    storageBuckets: mockStorageBuckets,
  } as typeof globalThis.navigator
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const result = await MarkDownCache.get(cacheName, 'non-existent-key', 'markdown-cache')

  expect(result).toBe('')
  expect(mockCache.match).toHaveBeenCalledWith('non-existent-key')
  globalThis.navigator = originalNavigator
})

test.skip('set - does nothing when storageBuckets is not supported', async () => {
  resetModules()
  const originalNavigator = globalThis.navigator
  // @ts-ignore
  globalThis.navigator = {}
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  await MarkDownCache.set(cacheName, 'test-key', 'markdown-cache', '<p>Hello</p>')

  globalThis.navigator = originalNavigator
})

test.skip('set - stores value in cache with correct headers', async () => {
  resetModules()
  const mockCache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(undefined),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const mockCaches = {
    open: jest.fn<(name: string) => Promise<typeof mockCache>>().mockResolvedValue(mockCache),
  }
  const mockBucket = {
    caches: mockCaches,
  }
  const mockStorageBuckets = {
    open: jest.fn<(name: string, options?: any) => Promise<typeof mockBucket>>().mockResolvedValue(mockBucket),
  }

  const originalNavigator = globalThis.navigator
  // @ts-expect-error storageBuckets is not in WorkerNavigator type but exists in browser
  globalThis.navigator = {
    storageBuckets: mockStorageBuckets,
  } as typeof globalThis.navigator
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const key = 'test-key'
  const value = '<p>Hello World</p>'

  await MarkDownCache.set(cacheName, key, 'markdown-cache', value)

  expect(mockCache.put).toHaveBeenCalledTimes(1)
  const putCall = mockCache.put.mock.calls[0]
  expect(putCall[0]).toBe(key)
  const response = putCall[1]
  expect(response).toBeInstanceOf(Response)
  expect(response.headers.get('Content-Type')).toBe('application/markdown')
  expect(response.headers.get('Content-Length')).toBe(`${value.length}`)
  globalThis.navigator = originalNavigator
})

test('set - stores a three-month expiration date', async () => {
  const cache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(undefined),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const getCache = jest.fn<(cacheName: string, bucketName: string) => Promise<typeof cache>>().mockResolvedValue(cache)
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')
  const now = Date.UTC(2026, 7, 22, 12, 0, 0)

  await MarkDownCache.set(cacheName, 'test-key', 'markdown-cache', '<p>Hello</p>', getCache, now)

  const response = cache.put.mock.calls[0][1]
  expect(response.headers.get('Expires')).toBe('Fri, 20 Nov 2026 12:00:00 GMT')
})

test.skip('set - stores value with correct Content-Length for empty string', async () => {
  resetModules()
  const mockCache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(undefined),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const mockCaches = {
    open: jest.fn<(name: string) => Promise<typeof mockCache>>().mockResolvedValue(mockCache),
  }
  const mockBucket = {
    caches: mockCaches,
  }
  const mockStorageBuckets = {
    open: jest.fn<(name: string, options?: any) => Promise<typeof mockBucket>>().mockResolvedValue(mockBucket),
  }

  const originalNavigator = globalThis.navigator
  // @ts-expect-error storageBuckets is not in WorkerNavigator type but exists in browser
  globalThis.navigator = {
    storageBuckets: mockStorageBuckets,
  } as typeof globalThis.navigator
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const key = 'empty-key'
  const value = ''

  await MarkDownCache.set(cacheName, key, 'markdown-cache', value)

  expect(mockCache.put).toHaveBeenCalledTimes(1)
  const putCall = mockCache.put.mock.calls[0]
  expect(putCall[0]).toBe(key)
  const response = putCall[1]
  expect(response).toBeInstanceOf(Response)
  expect(response.headers.get('Content-Length')).toBe('0')
  globalThis.navigator = originalNavigator
})

test.skip('set - stores value with correct Content-Length for long string', async () => {
  resetModules()
  const mockCache = {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(undefined),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
  const mockCaches = {
    open: jest.fn<(name: string) => Promise<typeof mockCache>>().mockResolvedValue(mockCache),
  }
  const mockBucket = {
    caches: mockCaches,
  }
  const mockStorageBuckets = {
    open: jest.fn<(name: string, options?: any) => Promise<typeof mockBucket>>().mockResolvedValue(mockBucket),
  }

  const originalNavigator = globalThis.navigator
  // @ts-expect-error storageBuckets is not in WorkerNavigator type but exists in browser
  globalThis.navigator = {
    storageBuckets: mockStorageBuckets,
  } as typeof globalThis.navigator
  const MarkDownCache = await import('../src/parts/MarkDownCache/MarkDownCache.ts')

  const key = 'long-key'
  const value = 'x'.repeat(1000)

  await MarkDownCache.set(cacheName, key, 'markdown-cache', value)

  expect(mockCache.put).toHaveBeenCalledTimes(1)
  const putCall = mockCache.put.mock.calls[0]
  expect(putCall[0]).toBe(key)
  const response = putCall[1]
  expect(response).toBeInstanceOf(Response)
  expect(response.headers.get('Content-Length')).toBe('1000')
  globalThis.navigator = originalNavigator
})
