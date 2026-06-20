export const featureRuntimeStatusEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  return 'main' in extension || 'browser' in extension
}
