import { getCache, type ICache } from '../GetCache/GetCache.ts'

type GetCache = (cacheName: string, bucketName: string) => Promise<ICache>

let cacheName = ''

export const setApplicationName = (applicationName: string): void => {
  cacheName = `${applicationName}/markdown-cache`
}

export const has = async (key: string, bucketName: string, getCacheFunction: GetCache = getCache): Promise<boolean> => {
  const cache = await getCacheFunction(cacheName, bucketName)
  const response = await cache.match(key)
  return Boolean(response)
}

export const get = async (key: string, bucketName: string, getCacheFunction: GetCache = getCache): Promise<string> => {
  const cache = await getCacheFunction(cacheName, bucketName)
  const response = await cache.match(key)
  const text = await response?.text()
  return text || ''
}

export const set = async (key: string, bucketName: string, value: string, getCacheFunction: GetCache = getCache): Promise<void> => {
  const cache = await getCacheFunction(cacheName, bucketName)
  await cache.put(
    key,
    new Response(value, {
      headers: {
        'Content-Length': `${value.length}`,
        'Content-Type': 'application/markdown',
      },
    }),
  )
}
