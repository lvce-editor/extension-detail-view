export const performCached = async <T, I>(
  generator: (input: I) => Promise<T>,
  cacheGet: (cacheKey: string) => Promise<T>,
  cacheHas: (cacheKey: string) => Promise<boolean>,
  cacheSet: (cacheKey: string, value: T) => Promise<void>,
  getCacheKey: (value: I) => Promise<string>,
  input: I,
): Promise<T> => {
  const cacheKey = await getCacheKey(input)
  const hasItem = await cacheHas(cacheKey)
  if (hasItem) {
    const value = await cacheGet(cacheKey)
    return value
  }
  const result = await generator(input)
  await cacheSet(cacheKey, result)
  return result
}
