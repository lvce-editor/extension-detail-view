import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'

export const getSecondEntries = (): readonly MoreInfoEntry[] => {
  return [
    {
      key: 'Published',
      value: 'n/a',
    },
    {
      key: 'Last Released',
      value: 'n/a',
    },
  ]
}
