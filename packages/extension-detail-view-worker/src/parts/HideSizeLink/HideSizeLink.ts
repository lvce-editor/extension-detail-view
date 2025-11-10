import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as GetInstallationEntries from '../GetInstallationEntries/GetInstallationEntries.ts'

export const hideSizeLink = (state: ExtensionDetailState): ExtensionDetailState => {
  const { displaySize, extensionId, extensionVersion, extensionUri } = state
  const newShowSizeLink = false
  const installationEntries: readonly MoreInfoEntry[] = GetInstallationEntries.getInstallationEntries(
    displaySize,
    extensionId,
    extensionVersion,
    extensionUri,
    newShowSizeLink,
  )
  return {
    ...state,
    installationEntries,
    showSizeLink: newShowSizeLink,
  }
}
