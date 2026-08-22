import * as CacheExpiration from '../CacheExpiration/CacheExpiration.ts'

export interface ICache {
  readonly match: (request: RequestInfo | URL, options?: CacheQueryOptions) => Promise<Response | undefined>
  readonly put: (request: RequestInfo | URL, response: Response) => Promise<void>
}

const cachedCaches: Record<string, Promise<ICache>> = Object.create(null)

const noopCache: ICache = {
  async match() {
    return undefined
  },
  async put() {},
}

const supportsStorageBuckets = (): boolean => {
  // @ts-ignore
  return Boolean(navigator.storageBuckets)
}

const getCacheInternal = async (cacheName: string, bucketName: string): Promise<ICache> => {
  if (!supportsStorageBuckets()) {
    return noopCache
  }
  // @ts-ignore
  const bucket = await navigator.storageBuckets.open(bucketName, {
    expires: Date.now() + CacheExpiration.duration,
    quota: 100 * 1024 * 1024, // 100MB
  })
  const cache = await bucket.caches.open(cacheName)
  return cache
}

export const getCache = (cacheName: string, bucketName: string): Promise<ICache> => {
  if (!(cacheName in cachedCaches)) {
    cachedCaches[cacheName] = getCacheInternal(cacheName, bucketName)
  }
  return cachedCaches[cacheName]
}
