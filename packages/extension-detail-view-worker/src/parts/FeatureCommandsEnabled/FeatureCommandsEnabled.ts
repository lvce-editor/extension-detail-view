export const featureCommandsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('commands' in extension)) {
    return false
  }
  const commands = extension.commands
  return Array.isArray(commands)
}
