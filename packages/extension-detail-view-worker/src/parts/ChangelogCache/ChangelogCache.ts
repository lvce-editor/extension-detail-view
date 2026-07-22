import { getCache, type ICache } from '../GetCache/GetCache.ts'

const bucketName = 'changelog-cache'
const cacheName = 'lvce-editor/changelog-cache'
const cachedAtHeader = 'X-Lvce-Editor-Cached-At'
const maxAge = 60 * 60 * 1000

type GetCache = (cacheName: string, bucketName: string) => Promise<ICache>

const getCacheKey = (uri: string): string => {
  return `https://-/changelog/${encodeURIComponent(uri)}`
}

const isFresh = (cachedAt: number, now: number): boolean => {
  return Number.isFinite(cachedAt) && now - cachedAt <= maxAge
}

export const get = async (uri: string, now: number = Date.now(), getCacheFunction: GetCache = getCache): Promise<string | undefined> => {
  try {
    const cache = await getCacheFunction(cacheName, bucketName)
    const response = await cache.match(getCacheKey(uri))
    if (!response) {
      return undefined
    }
    const cachedAt = Number(response.headers.get(cachedAtHeader))
    if (!isFresh(cachedAt, now)) {
      return undefined
    }
    return response.text()
  } catch {
    return undefined
  }
}

export const set = async (uri: string, value: string, now: number = Date.now(), getCacheFunction: GetCache = getCache): Promise<void> => {
  try {
    const cache = await getCacheFunction(cacheName, bucketName)
    await cache.put(
      getCacheKey(uri),
      new Response(value, {
        headers: {
          [cachedAtHeader]: `${now}`,
          'Content-Length': `${value.length}`,
          'Content-Type': 'application/markdown',
        },
      }),
    )
  } catch {
    return
  }
}
