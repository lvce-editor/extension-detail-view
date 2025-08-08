import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { HeaderData } from '../HeaderData/HeaderData.ts'
import * as ExtensionDisplay from '../ExtensionDisplay/ExtensionDisplay.ts'
import * as GetBadge from '../GetBadge/GetBadge.ts'
import * as HasColorThemes from '../HasColorThemes/HasColorThemes.ts'

export const loadHeaderContent = (state: ExtensionDetailState, platform: number, extension: any): HeaderData => {
  const { assetDir, builtinExtensionsBadgeEnabled } = state
  const iconSrc = ExtensionDisplay.getIcon(extension, platform, assetDir)
  const description = ExtensionDisplay.getDescription(extension)
  const name = ExtensionDisplay.getName(extension)
  const extensionUri = extension.uri || extension.path
  const extensionId = extension?.id || 'n/a'
  const extensionVersion = extension?.version || 'n/a'
  const hasColorTheme = HasColorThemes.hasColorThemes(extension)
  const isBuiltin = extension?.builtin
  const badge = GetBadge.getBadge(isBuiltin, builtinExtensionsBadgeEnabled)
  const downloadCount = ExtensionDisplay.getDownloadCount(extension)
  const rating = ExtensionDisplay.getRating(extension)
  return {
    badge,
    description,
    downloadCount,
    extension,
    extensionId,
    extensionUri,
    extensionVersion,
    hasColorTheme,
    iconSrc,
    name,
    rating,
  }
}
