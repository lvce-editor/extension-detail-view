const minute = 60 * 1000
const hour = 60 * minute
const day = 24 * hour
const month = 30 * day
const year = 365 * day

const relativeTimeFormat = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'always',
})

const getRelativeValue = (diff: number): readonly [number, Intl.RelativeTimeFormatUnit] => {
  const absoluteDiff = Math.abs(diff)
  if (absoluteDiff >= year) {
    return [Math.trunc(diff / year), 'year']
  }
  if (absoluteDiff >= month) {
    return [Math.trunc(diff / month), 'month']
  }
  if (absoluteDiff >= day) {
    return [Math.trunc(diff / day), 'day']
  }
  if (absoluteDiff >= hour) {
    return [Math.trunc(diff / hour), 'hour']
  }
  return [Math.trunc(diff / minute), 'minute']
}

export const formatCreated = (created: number | null, now: number = Date.now()): string => {
  if (created === null || !Number.isFinite(created)) {
    return 'n/a'
  }
  const diff = created - now
  const [value, unit] = getRelativeValue(diff)
  return relativeTimeFormat.format(value, unit)
}
