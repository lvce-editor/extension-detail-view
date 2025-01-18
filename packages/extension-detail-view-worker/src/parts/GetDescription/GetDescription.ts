export const getDescription = (extension: any): string => {
  if (!extension || !extension.description) {
    return 'n/a'
  }
  return extension.description
}
