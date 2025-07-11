import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getInstallationEntries = (
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  extensionUri: string,
): readonly MoreInfoEntry[] => {
  const entries: readonly MoreInfoEntry[] = [
    {
      key: 'Identifier',
      value: extensionId,
      odd: true,
      code: true,
    },
    {
      key: 'Version',
      value: extensionVersion,
      code: true,
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
      title: extensionUri,
    },
  ]
  return entries
}
