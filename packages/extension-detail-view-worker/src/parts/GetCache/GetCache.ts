// TODO pass application name from renderer worker to not hardcode it
const bucketName = 'markdown-cache'

const cachedCaches: Record<string, Promise<Cache>> = Object.create(null)

const getCacheInternal = async (cacheName: string): Promise<Cache> => {
  const twoWeeks = 14 * 24 * 60 * 60 * 1000
  // @ts-ignore
  const bucket = await navigator.storageBuckets.open(bucketName, {
    quota: 20 * 1024 * 1024, // 20MB
    expires: Date.now() + twoWeeks,
  })
  const cache = await bucket.caches.open(cacheName)
  return cache
}

export const getCache = (cacheName: string): Promise<Cache> => {
  if (!(cacheName in cachedCaches)) {
    cachedCaches[cacheName] = getCacheInternal(cacheName)
  }
  return cachedCaches[cacheName]
}
