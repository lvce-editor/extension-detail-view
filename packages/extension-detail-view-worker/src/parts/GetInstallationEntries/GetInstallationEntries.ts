import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as FormatCreated from '../FormatCreated/FormatCreated.ts'
import * as FormatLastUpdated from '../FormatLastUpdated/FormatLastUpdated.ts'
import { getSizeEntries } from '../GetSizeEntries/GetSizeEntries.ts'

const addOddEntries = (entries: readonly MoreInfoEntry[]): readonly MoreInfoEntry[] => {
  return entries.map((entry, index) => {
    if (index % 2 === 0) {
      return {
        ...entry,
        odd: true,
      }
    }
    return entry
  })
}

export const getInstallationEntries = (
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  extensionUri: string,
  showSizeLink: boolean,
  created: number | null,
  lastUpdated: number | null,
): readonly MoreInfoEntry[] => {
  const entries: MoreInfoEntry[] = [
    {
      code: true,
      key: ExtensionDetailStrings.identifier(),
      value: extensionId,
    },
    {
      code: true,
      key: ExtensionDetailStrings.version(),
      value: extensionVersion,
    },
  ]
  if (created !== null) {
    entries.push({
      key: ExtensionDetailStrings.created(),
      value: FormatCreated.formatCreated(created),
    })
  }
  entries.push(
    {
      key: ExtensionDetailStrings.lastUpdated(),
      value: FormatLastUpdated.formatLastUpdated(lastUpdated),
    },
    ...getSizeEntries(showSizeLink, displaySize, extensionUri),
  )
  return addOddEntries(entries)
}
