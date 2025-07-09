export const getBadge = (builtin: boolean, badgeEnabled: boolean): string => {
  if (builtin && badgeEnabled) {
    return 'builtin'
  }
  return ''
}
