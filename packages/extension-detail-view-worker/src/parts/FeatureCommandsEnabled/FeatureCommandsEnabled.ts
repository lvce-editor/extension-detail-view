export const featureCommandsEnabled = (extension: any): boolean => {
  return !!(extension && extension.commands && extension.commands.length > 0)
}