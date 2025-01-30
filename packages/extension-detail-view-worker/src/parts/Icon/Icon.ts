import * as AssetDir from '../AssetDir/AssetDir.ts'

// deprecated, use the functions with dynamic assetDir instead
export const ExtensionDefaultIcon = `${AssetDir.assetDir}/icons/extensionDefaultIcon.png`
export const ExtensionLanguageBasics = `${AssetDir.assetDir}/icons/language-icon.svg`
export const ExtensionTheme = `${AssetDir.assetDir}/icons/theme-icon.png`

export const extensionDefaultIcon = (assetDir: string): string => {
  return `${assetDir}/icons/extensionDefaultIcon.png`
}

export const extensionLanguageBasics = (assetDir: string): string => {
  return `${assetDir}/icons/language-icon.svg`
}

export const extensionTheme = (assetDir: string): string => {
  return `${assetDir}/icons/theme-icon.png`
}
