import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getInstallationEntries = (displaySize: string): readonly MoreInfoEntry[] => {
  const entries: readonly MoreInfoEntry[] = [
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
    {
      key: 'Size',
      value: `${displaySize}`,
      onClick: DomEventListenerFunctions.HandleClickSize,
    },
  ]
  return entries
}
