export const featureCommandsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('commands' in extension)) {
    return false
  }
  return Array.isArray(extension.commands)
}
