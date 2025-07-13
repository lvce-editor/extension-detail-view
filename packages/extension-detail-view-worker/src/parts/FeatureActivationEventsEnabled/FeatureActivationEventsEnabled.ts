export const featureActivationEventsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('activation' in extension)) {
    return false
  }
  const activation = extension.activation
  return typeof activation === 'object' && activation !== null
}
