import * as FormatCreated from '../FormatCreated/FormatCreated.ts'

export const formatLastUpdated = (lastUpdated: number | null, now: number = Date.now()): string => {
  return FormatCreated.formatCreated(lastUpdated, now)
}
