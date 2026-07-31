export const getOpenUri = (uri: string): string => {
  if (!uri.includes('://')) {
    return uri
  }
  const url = new URL(uri)
  if (url.protocol === 'file:') {
    return decodeURIComponent(url.pathname)
  }
  if (url.pathname.startsWith('/remote/')) {
    return decodeURIComponent(url.pathname.slice('/remote'.length))
  }
  return uri
}
