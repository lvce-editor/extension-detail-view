export const getBadge = (extension: any): string => {
  if (extension?.builtin) {
    return 'builtin'
  }
  return ''
}