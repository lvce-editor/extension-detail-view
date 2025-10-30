const supportsNormalCacheKey = (locationProtocol: string): boolean => {
  return locationProtocol === 'http:' || locationProtocol === 'https:'
}

export const getMarkdownCacheKey = (hash: string, locationProtocol: string): string => {
  if (supportsNormalCacheKey(locationProtocol)) {
    return `/markdown/${hash}`
  }
  // workaround for electron bug
  return `https://markdown/${hash}`
}
