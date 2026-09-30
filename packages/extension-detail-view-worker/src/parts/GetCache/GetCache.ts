import { RendererWorker } from '@lvce-editor/rpc-registry'
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

const getRequestUrl = (request: RequestInfo | URL): string => {
  if (request instanceof Request) {
    return request.url
  }
  return request.toString()
}

const getCacheInternal = async (cacheName: string, bucketName: string): Promise<ICache> => {
  if (!supportsStorageBuckets()) {
    return noopCache
  }
  const bucketOptions = {
    expires: Date.now() + CacheExpiration.duration,
    quota: 100 * 1024 * 1024, // 100MB
  }
  return {
    async match(request): Promise<Response | undefined> {
      try {
        const cached = await RendererWorker.invoke('CacheWorker.getCacheStorageItem', getRequestUrl(request), cacheName, bucketName, bucketOptions)
        if (!cached) {
          return undefined
        }
        return new Response(cached.body, {
          headers: cached.headers,
          status: cached.status,
          statusText: cached.statusText,
        })
      } catch {
        return undefined
      }
    },
    async put(request, response): Promise<void> {
      const body = await response.text()
      const headers = Object.fromEntries(response.headers.entries())
      try {
        await RendererWorker.invoke('CacheWorker.setCacheStorageItem', getRequestUrl(request), body, cacheName, headers, bucketName, bucketOptions)
      } catch {
        return
      }
    },
  }
}

export const getCache = (cacheName: string, bucketName: string): Promise<ICache> => {
  const cacheKey = `${bucketName}\u{0}${cacheName}`
  if (!(cacheKey in cachedCaches)) {
    cachedCaches[cacheKey] = getCacheInternal(cacheName, bucketName)
  }
  return cachedCaches[cacheKey]
}
