export const featureRuntimeStatusEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('main' in extension)) {
    return false
  }
  return Boolean(extension.main)
}
