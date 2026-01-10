export const parseLastUpdated = (extension: unknown): number | null => {
  if (!extension || typeof extension !== 'object') {
    return null
  }
  const { lastUpdated } = extension as { lastUpdated?: unknown }
  if (lastUpdated === undefined || lastUpdated === null) {
    return null
  }
  if (typeof lastUpdated === 'number') {
    if (Number.isFinite(lastUpdated) && lastUpdated > 0) {
      return lastUpdated
    }
    return null
  }
  if (typeof lastUpdated === 'string') {
    const parsed = Number.parseFloat(lastUpdated)
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed
    }
  }
  return null
}
