import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'

export const getMarketplaceEntries = (isBuiltin: boolean): readonly MoreInfoEntry[] => {
  if (isBuiltin) {
    return []
  }
  return [
    {
      key: 'Published',
      value: 'n/a',
      odd: true,
    },
    {
      key: 'Last Released',
      value: 'n/a',
    },
  ]
}
