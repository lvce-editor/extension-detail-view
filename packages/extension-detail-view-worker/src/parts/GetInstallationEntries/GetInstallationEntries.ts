import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getInstallationEntries = (displaySize: string, extensionId: string, extensionVersion: string): readonly MoreInfoEntry[] => {
  const entries: readonly MoreInfoEntry[] = [
    {
      key: 'Identifier',
      value: extensionId,
      odd: true,
    },
    {
      key: 'Version',
      value: extensionVersion,
    },
    {
      key: 'Last Updated',
      value: 'n/a',
      odd: true,
    },
    {
      key: 'Size',
      value: displaySize,
      onClick: DomEventListenerFunctions.HandleClickSize,
    },
  ]
  return entries
}
