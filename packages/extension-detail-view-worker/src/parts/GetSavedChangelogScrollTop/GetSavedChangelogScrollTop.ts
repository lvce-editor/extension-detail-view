export const getSavedChangelogScrollTop = (savedState: unknown): number => {
  if (savedState && typeof savedState === 'object' && 'changelogScrollTop' in savedState && typeof savedState.changelogScrollTop === 'number') {
    return savedState.changelogScrollTop
  }
  return 0
}