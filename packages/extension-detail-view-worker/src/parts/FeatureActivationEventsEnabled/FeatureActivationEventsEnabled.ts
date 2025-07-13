export const featureActivationEventsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('activation' in extension)) {
    return false
  }
  const { activation } = extension
  return typeof activation === 'object' && activation !== null
}
