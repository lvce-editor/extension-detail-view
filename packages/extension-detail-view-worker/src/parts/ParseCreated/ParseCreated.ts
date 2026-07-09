export const parseCreated = (extension: unknown): number | null => {
  if (!extension || typeof extension !== 'object') {
    return null
  }
  const { created } = extension as { created?: unknown }
  if (typeof created !== 'string' || created === '') {
    return null
  }
  const timestamp = Date.parse(created)
  if (!Number.isFinite(timestamp)) {
    return null
  }
  return timestamp
}
