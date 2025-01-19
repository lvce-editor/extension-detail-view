import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'

export const getMarketplaceEntries = (): readonly MoreInfoEntry[] => {
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
