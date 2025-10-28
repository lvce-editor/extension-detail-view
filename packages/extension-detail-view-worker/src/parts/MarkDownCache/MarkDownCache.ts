import { getCache } from '../GetCache/GetCache.ts'

// TODO pass application name from renderer worker to not hardcode it
const cacheName = 'lvce-editor/markdown-cache'

export const has = async (key: string): Promise<boolean> => {
  const cache = await getCache(cacheName)
  const response = await cache.match(key)
  return Boolean(response)
}

export const get = async (key: string): Promise<string> => {
  const cache = await getCache(cacheName)
  const response = await cache.match(key)
  const text = await response?.text()
  return text || ''
}

export const set = async (key: string, value: string): Promise<void> => {
  const cache = await getCache(cacheName)
  await cache.put(
    key,
    new Response(value, {
      headers: {
        'Content-Type': 'application/markdown',
        'Content-Length': `${value.length}`,
      },
    }),
  )
}
