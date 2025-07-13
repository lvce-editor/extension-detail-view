export const featureActivationEventsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('activation' in extension)) {
    return false
  }
  return Array.isArray(extension.activation)
}
