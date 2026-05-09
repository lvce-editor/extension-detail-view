export const supportsFileSize = (uri: string): boolean => {
  return !uri.startsWith('http:') && !uri.startsWith('https://')
}
