export const getName = (extension: any): string => {
  if (extension && extension.name) {
    return extension.name
  }
  if (extension && extension.id) {
    return extension.id
  }
  return 'n/a'
}
