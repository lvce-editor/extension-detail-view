export const formatLastUpdated = (lastUpdated: number | null): string => {
  if (lastUpdated === null) {
    return 'n/a'
  }
  try {
    const date = new Date(lastUpdated * 1000)
    if (Number.isNaN(date.getTime())) {
      return 'n/a'
    }
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return 'n/a'
  }
}
