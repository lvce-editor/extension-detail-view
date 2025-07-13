import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDisplay from '../ExtensionDisplay/ExtensionDisplay.ts'

export interface HeaderData {
  extensionId: string
  name: string
  extensionUri: string
  iconSrc: string
  extensionVersion: string
  description: string
  extension: any
}

export const loadHeaderContent = (
  state: ExtensionDetailState,
  platform: number,
  extension: any
): HeaderData => {
  const { assetDir } = state
  const iconSrc = ExtensionDisplay.getIcon(extension, platform, assetDir)
  const description = ExtensionDisplay.getDescription(extension)
  const name = ExtensionDisplay.getName(extension)
  const extensionUri = extension.uri || extension.path
  const extensionId = extension?.id || 'n/a'
  const extensionVersion = extension?.version || 'n/a'
  return {
    extensionId,
    name,
    extensionUri,
    iconSrc,
    extensionVersion,
    description,
    extension,
  }
}