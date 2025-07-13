export const featureActivationEventsEnabled = (extension: any): boolean => {
  return !!(extension && extension.activation && Object.keys(extension.activation).length > 0)
}