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
    ...getSizeEntries(showSizeLink, displaySize, extensionUri),
  ]
  return entries
}
