export const getExtensionIdFromUri = (uri: string): string => {
  if (uri.startsWith('extension-detail:///')) {
    return decodeURIComponent(uri.slice('extension-detail:///'.length).split('/', 1)[0])
  }
  return uri.slice('extension-detail://'.length)
}
