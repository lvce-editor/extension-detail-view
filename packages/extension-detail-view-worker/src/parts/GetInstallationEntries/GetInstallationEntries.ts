import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getSizeEntries } from '../GetSizeEntries/GetSizeEntries.ts'

export const getInstallationEntries = (
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  extensionUri: string,
  showSizeLink: boolean,
): readonly MoreInfoEntry[] => {
  const entries: readonly MoreInfoEntry[] = [
    {
      code: true,
      key: ExtensionDetailStrings.identifier(),
      odd: true,
      value: extensionId,
    },
    {
      code: true,
      key: ExtensionDetailStrings.version(),
      value: extensionVersion,
    },
    {
      key: ExtensionDetailStrings.lastUpdated(),
      odd: true,
      value: 'n/a', // TODO get this from somewhere
    },
    ...getSizeEntries(showSizeLink, displaySize, extensionUri),
  ]
  return entries
}
