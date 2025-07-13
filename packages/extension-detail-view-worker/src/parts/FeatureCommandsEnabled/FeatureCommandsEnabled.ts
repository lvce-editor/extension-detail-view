export const featureCommandsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  // @ts-expect-error
  const commands = extension.commands
  return Boolean(Array.isArray(commands) && commands.length > 0)
}