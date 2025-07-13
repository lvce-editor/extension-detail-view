export const featureActivationEventsEnabled = (extension: unknown): boolean => {
  if (!extension) {
    return false
  }
  return (
    typeof extension === 'object' &&
    'activation' in extension &&
    typeof extension.activation === 'object' &&
    extension.activation !== null &&
    Object.keys(extension.activation).length > 0
  )
}
