export const supportsFileSize = (uri: string): boolean => {
  if (uri.startsWith('http:') || uri.startsWith('https://')) {
    return false
  }
  return true
}
