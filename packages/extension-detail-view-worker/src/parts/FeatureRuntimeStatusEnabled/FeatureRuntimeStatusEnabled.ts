export const featureRuntimeStatusEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if ('main' in extension || 'browser' in extension) {
    return true
  }
  return false
}
