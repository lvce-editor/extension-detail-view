export const featureActivationEventsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  // @ts-expect-error
  const activation = extension.activation
  return activation && typeof activation === 'object' && Object.keys(activation).length > 0
}