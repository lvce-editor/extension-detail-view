import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMarketplaceEntries = (isBuiltin: boolean): readonly MoreInfoEntry[] => {
  if (isBuiltin) {
    return []
  }
  return [
    {
      key: ExtensionDetailStrings.published(),
      odd: true,
      value: 'n/a',
    },
    {
      key: ExtensionDetailStrings.lastReleased(),
      value: 'n/a',
    },
  ]
}
