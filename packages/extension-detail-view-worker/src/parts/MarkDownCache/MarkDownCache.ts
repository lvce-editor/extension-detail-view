import { getCache } from '../GetCache/GetCache.ts'

// TODO pass application name from renderer worker to not hardcode it
const cacheName = 'lvce-editor/markdown-cache'

export const has = async (key: string, bucketName: string): Promise<boolean> => {
  const cache = await getCache(cacheName, bucketName)
  const response = await cache.match(key)
  return Boolean(response)
}

export const get = async (key: string, bucketName: string): Promise<string> => {
  const cache = await getCache(cacheName, bucketName)
  const response = await cache.match(key)
  const text = await response?.text()
  return text || ''
}

export const set = async (key: string, bucketName: string, value: string): Promise<void> => {
  const cache = await getCache(cacheName, bucketName)
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
