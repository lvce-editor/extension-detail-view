export const featureCommandsEnabled = (extension: unknown): boolean => {
  if (!extension) {
    return false
  }
  return typeof extension === 'object' && 'commands' in extension && Array.isArray(extension.commands) && extension.commands.length > 0
}
