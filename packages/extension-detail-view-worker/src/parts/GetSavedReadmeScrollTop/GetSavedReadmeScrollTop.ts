export const getSavedReadmeScrollTop = (savedState: unknown): number => {
  if (savedState && typeof savedState === 'object' && 'readmeScrollTop' in savedState && typeof savedState.readmeScrollTop === 'number') {
    return savedState.readmeScrollTop
  }
  return 0
}
