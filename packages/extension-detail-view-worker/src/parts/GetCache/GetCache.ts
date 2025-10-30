// TODO pass application name from renderer worker to not hardcode it
const bucketName = 'markdown-cache'

export interface ICache {
  readonly put: (request: RequestInfo | URL, response: Response) => Promise<void>
  readonly match: (request: RequestInfo | URL, options?: CacheQueryOptions) => Promise<Response | undefined>
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

const getCacheInternal = async (cacheName: string): Promise<ICache> => {
  if (!supportsStorageBuckets()) {
    return noopCache
  }
  const twoWeeks = 14 * 24 * 60 * 60 * 1000
  // @ts-ignore
  const bucket = await navigator.storageBuckets.open(bucketName, {
    quota: 20 * 1024 * 1024, // 20MB
    expires: Date.now() + twoWeeks,
  })
  const cache = await bucket.caches.open(cacheName)
  return cache
}

export const getCache = (cacheName: string): Promise<ICache> => {
  if (!(cacheName in cachedCaches)) {
    cachedCaches[cacheName] = getCacheInternal(cacheName)
  }
  return cachedCaches[cacheName]
}
