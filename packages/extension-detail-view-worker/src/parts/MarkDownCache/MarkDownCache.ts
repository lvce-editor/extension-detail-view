import * as CacheExpiration from '../CacheExpiration/CacheExpiration.ts'
import { getCache, type ICache } from '../GetCache/GetCache.ts'

type GetCache = (cacheName: string, bucketName: string) => Promise<ICache>

export const has = async (cacheName: string, key: string, bucketName: string, getCacheFunction: GetCache = getCache): Promise<boolean> => {
  const cache = await getCacheFunction(cacheName, bucketName)
  const response = await cache.match(key)
  return Boolean(response)
}

export const get = async (cacheName: string, key: string, bucketName: string, getCacheFunction: GetCache = getCache): Promise<string> => {
  const cache = await getCacheFunction(cacheName, bucketName)
  const response = await cache.match(key)
  const text = await response?.text()
  return text || ''
}

export const set = async (
  cacheName: string,
  key: string,
  bucketName: string,
  value: string,
  getCacheFunction: GetCache = getCache,
  now: number = Date.now(),
): Promise<void> => {
  const cache = await getCacheFunction(cacheName, bucketName)
  await cache.put(
    key,
    new Response(value, {
      headers: {
        'Content-Length': `${value.length}`,
        'Content-Type': 'application/markdown',
        Expires: CacheExpiration.getExpirationDate(now),
      },
    }),
  )
}
