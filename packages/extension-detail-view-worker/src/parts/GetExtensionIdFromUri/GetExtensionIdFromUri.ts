export const getExtensionIdFromUri = (uri: string): string => {
  const id = uri.slice('extension-detail://'.length)
  return id
}
