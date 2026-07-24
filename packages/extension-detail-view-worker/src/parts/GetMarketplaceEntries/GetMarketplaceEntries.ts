import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMarketplaceEntries = (isBuiltin: boolean): readonly MoreInfoEntry[] => {
  if (isBuiltin) {
    return []
  }
  return [
    {
      code: undefined,
      key: ExtensionDetailStrings.published(),
      odd: true,
      onClick: undefined,
      title: undefined,
      value: 'n/a',
    },
    {
      code: undefined,
      key: ExtensionDetailStrings.lastReleased(),
      odd: undefined,
      onClick: undefined,
      title: undefined,
      value: 'n/a',
    },
  ]
}
