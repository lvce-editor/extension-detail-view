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
      odd: undefined,
      onClick: undefined,
      title: undefined,
      value: extensionId,
    },
    {
      code: true,
      key: ExtensionDetailStrings.version(),
      odd: undefined,
      onClick: undefined,
      title: undefined,
      value: extensionVersion,
    },
  ]
  if (created !== null) {
    entries.push({
      code: undefined,
      key: ExtensionDetailStrings.created(),
      odd: undefined,
      onClick: undefined,
      title: undefined,
      value: FormatCreated.formatCreated(created),
    })
  }
  entries.push(
    {
      code: undefined,
      key: ExtensionDetailStrings.lastUpdated(),
      odd: undefined,
      onClick: undefined,
      title: undefined,
      value: FormatLastUpdated.formatLastUpdated(lastUpdated),
    },
    ...getSizeEntries(showSizeLink, displaySize, extensionUri),
  )
  return addOddEntries(entries)
}
