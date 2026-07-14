const secondsToMillisecondsThreshold = 10_000_000_000

const normalizeTimestamp = (timestamp: number): number | null => {
  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return null
  }
  if (timestamp < secondsToMillisecondsThreshold) {
    return timestamp * 1000
  }
  return timestamp
}

export const parseLastUpdated = (extension: unknown): number | null => {
  if (!extension || typeof extension !== 'object') {
    return null
  }
  const { lastUpdated } = extension as { lastUpdated?: unknown }
  if (lastUpdated === undefined || lastUpdated === null) {
    return null
  }
  if (typeof lastUpdated === 'number') {
    return normalizeTimestamp(lastUpdated)
  }
  if (typeof lastUpdated === 'string') {
    const numericTimestamp = Number(lastUpdated)
    if (Number.isFinite(numericTimestamp)) {
      return normalizeTimestamp(numericTimestamp)
    }
    return normalizeTimestamp(Date.parse(lastUpdated))
  }
  return null
}
