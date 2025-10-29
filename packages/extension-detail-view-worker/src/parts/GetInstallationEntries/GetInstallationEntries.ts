import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getInstallationEntries = (
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  extensionUri: string,
): readonly MoreInfoEntry[] => {
  const entries: readonly MoreInfoEntry[] = [
    {
      key: ExtensionDetailStrings.identifier(),
      value: extensionId,
      odd: true,
      code: true,
    },
    {
      key: ExtensionDetailStrings.version(),
      value: extensionVersion,
      code: true,
    },
    {
      key: ExtensionDetailStrings.lastUpdated(),
      value: 'n/a', // TODO get this from somewhere
      odd: true,
    },
    {
      key: ExtensionDetailStrings.size(),
      value: displaySize,
      onClick: DomEventListenerFunctions.HandleClickSize,
      title: extensionUri,
    },
  ]
  return entries
}
