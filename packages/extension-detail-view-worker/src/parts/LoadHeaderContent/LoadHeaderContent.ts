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

export const loadHeaderContent = (state: ExtensionDetailState, platform: number, extension: any): HeaderData => {
  const { assetDir } = state
  const iconSrc: string = ExtensionDisplay.getIcon(extension, platform, assetDir)
  const description: string = ExtensionDisplay.getDescription(extension)
  const name: string = ExtensionDisplay.getName(extension)
  const extensionUri: string = extension.uri || extension.path
  const extensionId: string = extension?.id || 'n/a'
  const extensionVersion: string = extension?.version || 'n/a'

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