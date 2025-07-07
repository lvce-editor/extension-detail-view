import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'

export const getEntries = (): readonly MoreInfoEntry[] => {
  return [
    {
      key: 'Identifier',
      value: 'abc',
    },
    {
      key: 'Version',
      value: '1.9.5',
    },
    {
      key: 'Last Updated',
      value: 'n/a',
    },
  ]
}
