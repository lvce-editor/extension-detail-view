export const getMarkdownCacheKey = (hash: string, locationProtocol: string): string => {
  if (locationProtocol === 'http:' || locationProtocol === 'https:') {
    return `/markdown/${hash}`
  }
  // workaround for electron bug
  return `https://markdown/${hash}`
}
